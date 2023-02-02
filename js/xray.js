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

			console.log("Printing json");
			//console.log(json);

			$.each(json, function (key, value) {
				console.log("pikken 1:" + value._desc);
				$main.append("<h5>" + key + " - " +	value._desc + "</h5>");
				$.each(value._images, function(id, image) {
					console.log(id);
					console.log(image);
					$main.append("<img src='./src/ortho/"+key + "/" +image+"' style='width: 100%; height: auto;'>");
				});
			});



		});

});

