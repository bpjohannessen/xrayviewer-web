$(document).ready(function() {
    $('.popup-gallery').each(function() {
		$(this).magnificPopup({
			delegate: 'a',
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
	

		var $queryurl = "http://localhost:3000/api";
		console.log($queryurl);

		$.getJSON($queryurl, function (json) {
			var $main = $("div#main");
			var $table = $("table#tableMain")


			console.log("Printing json");
			//console.log(json);

			$.each(json, function (key, value) {
				$table.append("<thead id='thead"+key+"'><tr><th colspan='2' id='th"+key+"'>");
				var $th = $("th#th"+key);
				// console.log("pikken 1:" + value._desc);
				$th.append("<h5><a href='#' onclick='$(hiddenText" + key +").show(); return false;'>#"+key+"</a><span style='display: none;' id='hiddenText"+key+"'> "+value._desc+"</span>");
				// + key + " - " +	value._desc + "</h5>");
				//$header = "<a href='#' onclick='$(hiddenText".$key.").show(); return false;'>#".$key."</a><span style=\"display: none;\" id=\"hiddenText".$key."\"> - ".$fr."</span>";

				$table.append("</th></tr></thead>");
				$table.append("<tbody class='popup-gallery' id='gallery"+key+"'><tr>")
				$gallerybody = $("tbody#gallery"+key);

				var noImages = value._images.length;
				var noLeft;
				console.log("Number:" + noImages);


				$.each(value._images, function(id, image) {

					//$filename = $src.$folder."/".$file;
					var filename = "./src/ortho/"+key + "/" + image;

					console.log(filename);

					console.log(id);
					console.log(image);
					$gallerybody.append("<td><a href="+filename+" title='FETTE NAJSs'><img src='./src/ortho/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
					noLeft = noImages - 1;
					if(noLeft % 2 == 0) {
						$gallerybody.append("</td></tr>");
						if(noLeft != 0) $gallerybody.append("<tr>");

					} else {
						$gallerybody.append("</td>");
					}

					//$gallerybody.append(id + " -kukken " + image);

					//$main.append("<img src='./src/ortho/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
				});
				$table.append("</tbody>");

			});
		});
	});