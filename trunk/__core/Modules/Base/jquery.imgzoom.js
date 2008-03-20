/**
 * Imgzoom 1.0 (Requires the dimensions-plugin)
 *
 * Opens links that point to images in the "ImgZoom" (zooms out the image)
 *
 * Usage: $.imgzoom();
 *
 * @class imgzoom
 * @param {Object} conf, custom config-object
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
jQuery.imgzoom = function(conf) {
	var config = {
		speed: 200,		// animation-speed of zoom
		dontFadeIn: 1,	// 1 = do not fade in, 0 = do fade in
		hideClicked: 1	// Whether to hide the image that was clicked to bring up the zoomed version
	};
	config = jQuery.extend(config, conf);
	config.doubleSpeed = config.speed / 4;

	// Let events bubble up to body (supports dynamically inserted links)
	jQuery(document.body).click(function(event) {
		// Get the clicked element (it may be an image inside a link)
		var clickedElement = jQuery(event.target);
		clickedElement = clickedElement.is('a') ? clickedElement : clickedElement.parents('a');

		// If clicked element has an 'href'-attribute matching the image-reg-exp, continue
		if(
			clickedElement && 
			clickedElement.is('a') && 
			clickedElement.attr('href').search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1
		) {
			// Get the href (that points to the image)
			var imgSrc = clickedElement.attr('href');

			// If it's alredy open, do nothing
			if(jQuery('div.imgzoom img[src="' +imgSrc +'"]').length) {
				return false;
			}

			// Whether to hide clicked element or not (set in config but always false for non-image-links)
			var hideClicked = 0;

			// See if link contains an image, if so get dimensions from the image rather than the link
			var tmpElement = clickedElement.find('img');
			if(tmpElement.length) {
				hideClicked = config.hideClicked;
			}
			else {
				tmpElement = clickedElement;
			}

			// Get the clicked element's dimensions (imgzoom will animate from this size to its real size)
			var offset = tmpElement.offset();
			var oldDim = {
				width: tmpElement.outerWidth(), 
				height: tmpElement.outerHeight(), 
				left: offset.left, 
				top: offset.top, 
				opacity: config.dontFadeIn
			};

			if(hideClicked) {
				clickedElement.css({visibility: 'hidden'}).addClass('imgzoom-hidden');
			}

			// This function animates and displays the imgzoom-div
			var displayImgzoom = function() {
				// Append image to body
				var imgzoom = jQuery('<div><img src="' +imgSrc +'" alt="" /></div>').css({position: 'absolute'}).appendTo(document.body);

				// Get the image's dimensions as well as the windows scroll-pos/dimensions
				var width = imgzoom.outerWidth();
				var height = imgzoom.outerHeight();
				var windowHeight = jQuery(window).height();
				var windowWidth = jQuery(window).width();
				var scrollLeft = jQuery(window).scrollLeft();
				var scrollTop = jQuery(window).scrollTop();
				var left = (windowWidth - width) / 2 + scrollLeft;
				var	top = (windowHeight - height) / 2 + scrollTop;

				// These are the dimensions of the imgzoom when zoomed out
				var newDim = {
					width: width,
					height: height, 
					left: left, 
					top: top, 
					opacity: 1, 
					overflow: 'auto'
				};

				// Now add close-button (we didn't want it in the dimensions-calculationas it's positioned absolutely anyway)
				var closeButton = jQuery('<a href="#">Close</a>').appendTo(imgzoom).hide();

				// Add imgzoom-class, imgzoom's dimensions to clicked element's and animate to new
				imgzoom.addClass('imgzoom').css(oldDim).animate(newDim, config.speed, function() {
					// Now center the imgzoom fixed (so it follows when you scroll)
				//	imgzoom.center();

					// Fade in the close-button (we do this because it looks ugly if shown during imgzoom animation due to overflow set to hidden)
					closeButton.fadeIn(config.doubleSpeed);

					// This replaces the image with a youtube-clip if the clicked link has a class of youtube-.*
					var classNames = clickedElement.attr('class');

					if(classNames) {
						classNames = classNames.split(' ');

						for(var i in classNames) {
							if(classNames[i].indexOf('youtube-') != -1) {
								var replaceDiv = jQuery('<div></div>').appendTo(imgzoom);
								var movie = classNames[i].substr(8);

								replaceDiv = replaceDiv[0];

								imgzoom.find('img').hide();

								var so = new SWFObject('http://www.youtube.com/v/' +movie, '', newDim.width, newDim.height, "9", "#fff");
								so.write(replaceDiv);
							}
						}
					}
				});

				// Hides the box
				var hideImgzoom = function() {
					if(!imgzoom.find('img').is(':visible')) {
						imgzoom.find('img').show();
						imgzoom.find('div').remove();
					}

					imgzoom.animate(oldDim, config.speed, function() {
						imgzoom.remove();

						if(hideClicked) {
							clickedElement.css({visibility: 'visible'}).removeClass('imgzoom-hidden');
						}
					});
				};

				// Close imgzoom on-close-link-click
				closeButton.click(function() {
					closeButton.fadeOut(config.doubleSpeed, hideImgzoom);

					return false;
				});
			};

			// Preload image
			var preload = new Image();
			preload.src = imgSrc;

			// Onload
			if(preload.complete) {
				displayImgzoom();
			}
			else {
				preload.onload = displayImgzoom;
			}

			return false;
		}
	});
};

// Quick way to destroy all open imgzooms (esc-key)
jQuery(document).keydown(function(event) {
	if(event.keyCode == 27) {
		jQuery('div.imgzoom').remove();
		jQuery('.imgzoom-hidden').css({visibility: 'visible'});
	}
});