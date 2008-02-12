$.imgZoom = function(config) {
	var conf = {
		speed: 200
	};
	conf = $.extend(conf, config);

	// Let events bubble up to body (supports dynamically inserted links)
	$(document.body).click(function(ev) {
		// Get the clicked element
		var el = ev.target;

		// If the clicked element is not an anchor, see if any of its parents is
		if(el.nodeName.toLowerCase() != 'a') {
			while(el.nodeName.toLowerCase() != 'a' && el.nodeName.toLowerCase() != 'body') {
				el = el.parentNode;
			}
		}

		// If clicked element (or any of its parents) has an 'href'-attribute matching the image-reg-exp, continue
		if(el.nodeName.toLowerCase() == 'a' && el.getAttribute('href').search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1) {
			// Store dimensions of clicked link
			var imgSrc = el.getAttribute('href');
			var t = $(el).find('img');
			if(!t.length) {
				t = $(el);
			}
			var offset = t.offset();
			var oldDim = {
				width: t.outerWidth(), 
				height: t.outerHeight(), 
				left: offset.left, 
				top: offset.top
			};

			// Preload image
			var preload = new Image();
			preload.src = imgSrc;

			// Onload
			preload.onload = function() {
				// Append image to body
				var img = $('<img src="' +imgSrc +'" alt="" />').appendTo(document.body).css({position: 'absolute'});

				// Get its dimensions
				var width = img.outerWidth();
				var height = img.outerHeight();
				var left = (jQuery(window).width() - width) / 2 + jQuery(window).scrollLeft();
				var	top = (jQuery(window).height() - height) / 2 + jQuery(window).scrollTop();
				var newDim = {
					width: width,
					height: height, 
					left: left, 
					top: top
				};

				// Set its dimensions to clicked element's
				img.css({
					left: oldDim.left, 
					top: oldDim.top, 
					width: oldDim.width, 
					height: oldDim.height, 
					opacity: 0
				}).animate({ // Animate to the new dims
					left: newDim.left,
					top: newDim.top, 
					width: newDim.width, 
					height: newDim.height, 
					opacity: 1
				}, conf.speed).click(function() { // Animate back and remove onclick
					$(this).animate({
						left: oldDim.left, 
						top: oldDim.top, 
						width: oldDim.width, 
						height: oldDim.height, 
						opacity: 0
					}, conf.speed, function() {
						$(this).remove();
					});
				});
			};

			return false;
		}
	});
};