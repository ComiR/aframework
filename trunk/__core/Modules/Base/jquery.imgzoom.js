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
	config.doubleSpeed= config.speed / 4;

	// Let events bubble up to body (supports dynamically inserted links)
	jQuery(document.body).click(function(event) {
		// Get the clicked element
		var clickedElement = event.target;

		// If the clicked element is not an anchor, see if any of its parents is
		if(clickedElement.nodeName.toLowerCase() != 'a') {
			clickedElement = $(clickedElement).parents('a')[0];
		}

		// If clicked element (or any of its parents) has an 'href'-attribute matching the image-reg-exp, continue
		if(
			clickedElement && 
			clickedElement.nodeName.toLowerCase() == 'a' && 
			clickedElement.getAttribute('href', 2).search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1
		) {
			// Get the href (that points to the image)
			var imgSrc = clickedElement.getAttribute('href', 2);

			// If it's alredy open, do nothing
			if($('div.imgzoom img[src="' +imgSrc +'"]').length) {
				return false;
			}

			// Whether to hide clicked element or not (set in config but always false for non-image-links)
			var hideClicked = 0;

			// See if link contains an image, if so get dimensions from the image rather than the link
			var e = jQuery(clickedElement).find('img');
			if(e.length) {
				hideClicked = config.hideClicked;
			}
			else {
				e = jQuery(clickedElement);
			}

			// Get the clicked element's dimensions
			var offset = e.offset();
			var oldDim = {
				width: e.outerWidth(), 
				height: e.outerHeight(), 
				left: offset.left, 
				top: offset.top, 
				opacity: config.dontFadeIn
			};

			if(hideClicked) {
				jQuery(clickedElement).css({visibility: 'hidden'});
			}

			// This function animates and displays the imgzoom-div
			var displayImgzoom = function() {
				// Append image to body
				var imgzoom = jQuery('<div><img src="' +imgSrc +'" alt="" /></div>').css({position: 'absolute'}).appendTo(document.body);

				// Get its dimensions
				var width = imgzoom.outerWidth();
				var height = imgzoom.outerHeight();
				var left = (jQuery(window).width() - width) / 2 + jQuery(window).scrollLeft();
				var	top = (jQuery(window).height() - height) / 2 + jQuery(window).scrollTop();

				// These are the dimensions of the imgzoom
				var newDim = {
					width: width,
					height: height, 
					left: left, 
					top: top, 
					opacity: 1, 
					overflow: 'auto'
				};

				// Now add close-button and stuff (we didn't want them in the dimensions-calculation)
				var closeButton = jQuery('<a href="#">Close</a>').appendTo(imgzoom).hide();

				// Set imgzoom's dimensions to clicked element's and animate to new
				imgzoom.addClass('imgzoom').css(oldDim).animate(newDim, config.speed, function() {
				//	imgzoom.center();
					closeButton.fadeIn(config.doubleSpeed);

					// This replaces the image with a youtube-clip if the clicked link has a class of youtube-.*
					var classNames = jQuery(clickedElement).attr('class');

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

				// Close imgzoom on-close-link-click
				closeButton.click(function() {
					closeButton.fadeOut(config.doubleSpeed, function() {
						if(!imgzoom.find('img').is(':visible')) {
							imgzoom.find('img').show();
							imgzoom.find('div').remove();
						}

						imgzoom.animate(oldDim, config.speed, function() {
							imgzoom.remove();

							if(hideClicked) {
								jQuery(clickedElement).css({visibility: 'visible'});
							}
						});
					});

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