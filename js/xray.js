$(document).ready(function() {

	$('body').each(function() {
		$(this).magnificPopup({
			delegate: 'a.kuken',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>FETTENAJS X-ray viewer</small>';
				}
			}
		});
	});


    // $('.popup-gallery').each(function() {
	// 	$(this).magnificPopup({
	// 		delegate: 'a',
	// 		type: 'image',
	// 		tLoading: 'Loading image #%curr%...',
	// 		mainClass: 'mfp-img-mobile',
	// 		gallery: {
	// 			enabled: true,
	// 			navigateByImgClick: true,
	// 			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	// 		},
	// 		image: {
	// 			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	// 			titleSrc: function(item) {
	// 				return item.el.attr('title') + '<small>FETTENAJS X-ray viewer</small>';
	// 			}
	// 		}
	// 	});
	// });
	

		// window.onhashchange = function() {
		// 	window.location.reload();
		// }
		// EDIT THE NEXT LINE
		var rooturl = "http://localhost:3000"
		const { hash } = window.location;
		const params = new URL(location.href).searchParams;
		const course = params.get('course');
		const dgswitch = params.get("diagnosis");
		console.log("window.location: " + window.location);
		var queryurl;
		var prefix;

		if(course == "pedsurg") {
			$queryurl = rooturl + "/api/pedsurg";
			prefix = "pedsurg";
		} else if(course == "pulmo") {
			$queryurl = rooturl + "/api/thorax";
			prefix = "thorax";
		} else {
			$queryurl = rooturl + "/api/ortho";
			prefix = "ortho";
		}

		console.log("api url: " + $queryurl);
		console.log(" ");

		$.getJSON($queryurl, function (json) {
			var $main = $("div#main");
			var $table = $("table#tableMain")


			//console.log("Printing json");
			//console.log(json);

			$.each(json, function (key, value) {
				var noImages = value._contents.length;
				var noLeft = noImages - 1;


				$table.append("<thead id='thead"+key+"'><tr><th colspan='5' id='th"+key+"'>");
				var $th = $("th#th"+key);
				// console.log("pikken 1:" + value._desc);
				console.log("Diagnosis: " + value._desc.diagnosis_en + " (" + noImages + ")");

				/*
				if(@$_GET["hidden"]==1) {
       				$header = "<a href='#' onclick='$(hiddenText".$key.").show(); return false;'>#".$key."</a><span style=\"display: none;\" id=\"hiddenText".$key."\"> - ".$fr."</span>";
        			$imgTitle = "CASE #".$folder;
    			} else {
			        $header = "#".$folder." - ".$fr;
				$imgTitle = "CASE #".$folder." - ".$fr;
				}*/

				if(dgswitch == "on") {
					$th.append("<h5><span>#" + key + " - "+value._desc.diagnosis_en+"</span></h5>");
				} else {
					$th.append("<h5><a href='#' onclick='$(hiddenText" + key +").show(); return false;'>#"+key+" &#11013;</a><span style='display: none;' id='hiddenText"+key+"'> "+value._desc.diagnosis_en+"</span></h5>");
				}



				// + key + " - " +	value._desc + "</h5>");
				//$header = "<a href='#' onclick='$(hiddenText".$key.").show(); return false;'>#".$key."</a><span style=\"display: none;\" id=\"hiddenText".$key."\"> - ".$fr."</span>";

				$table.append("</th></tr></thead>");
				$tbody = "<tbody class='popup-gallery' id='gallery"+key+"'><tr id='row"+key+"'></tr></tbody>";
				//$tr = $("tr#row"+key);
				//console.log("Appending to tr" + $tr);
				//console.log(JSON.stringify(tr));
				//$("#row"+key).append("<td>test</td>");
				//console.log("kukken: " + $('tr#tr'+key));
				//$table.append("<tbody class='popup-gallery' id='gallery"+key+"'>");
				$table.append($tbody);
				$gallerybody = $("tbody#gallery"+key);
				$tr = $("tr#row"+key);
				console.log($gallerybody);

				var noImages = value._contents.length;
				var noLeft = noImages - 1;
				//console.log("No. of images: " + noImages);
				
				// $gallerybody.append("<div class='popup-gallery'>");

				$.each(value._contents, function(id, image) {

					//$tr.append("<td>test</td>");
					console.log($tr);

					//$filename = $src.$folder."/".$file;
					var filename = "./src/"+prefix+"/"+key + "/" + image;

					console.log("No. " + id + " - url " +filename);

					//console.log(id);
					//console.log(image);
					if(dgswitch == "on") {
						$tr.append("<td><a class='kuken' href="+filename+" title='#"+key + " - " + value._desc.diagnosis_en+"'><img src='./src/"+prefix+"/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
					} else {
						$tr.append("<td><a class='kuken' href="+filename+" title='"+key+"'><img src='./src/"+prefix+"/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
					}
					//$gallerybody.append("<td><a class='kuken' href="+filename+" title='"+key+"'><img src='./src/"+prefix+"/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
					//noLeft = noImages - 1;
					// if(noLeft % 2 == 0) {
					// 	$tr.append("</td></tr>");
					// 	if(noLeft != 0) $gallerybody.append("<tr>");

					// } else {
					// 	$tr.append("</td>");
					// }

					//$gallerybody.append(id + " -kukken " + image);

					//$main.append("<img src='./src/ortho/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
				});
				$table.append("</tbody>");
				console.log(" ");

			});
		});
	});