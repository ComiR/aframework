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
		speed: 200
	};
	config = jQuery.extend(config, conf);

	// Let events bubble up to body (supports dynamically inserted links)
	jQuery(document.body).click(function(event) {
		// Get the clicked element
		var clickedElement = event.target;

		// If the clicked element is not an anchor, see if any of its parents is
		if(clickedElement.nodeName.toLowerCase() != 'a') {
			clickedElement = $(clickedElement).parents('a')[0];
		}

		// If clicked element (or any of its parents) has an 'href'-attribute matching the image-reg-exp, continue
		if(clickedElement && clickedElement.nodeName.toLowerCase() == 'a' && clickedElement.getAttribute('href').search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1) {
			// Get the href (that points to the image)
			var imgSrc = clickedElement.getAttribute('href', 2);

			if($('div.imgzoom img[src="' +imgSrc +'"]').length) {
				return false;
			}

			// See if link contains an image, if so get dimensions and description
			// (alt-attribute) from it, else use anchor's dimensions and title-attribute
			var e = jQuery(clickedElement).find('img');
			var description = '';
			if(e.length) {
				description = e.attr('alt') || '';
			}
			else {
				e = jQuery(clickedElement);
				description = e.attr('title') || '';
			}	
			if(description.length) {
				description = '<p>' +description +'</p>';
			}

			// Get the clicked element's dimensions
			var offset = e.offset();
			var oldDim = {
				width: e.outerWidth(), 
				height: e.outerHeight(), 
				left: offset.left, 
				top: offset.top, 
				opacity: 0
			};

			// This function animates and displays the imgzoom-div
			var displayImgzoom = function() {
				// Append image to body
				var imgzoom = jQuery('<div><img src="' +imgSrc +'" alt="" /></div>').css({position: 'absolute'}).appendTo(document.body);

				// Get its dimensions
				var width = imgzoom.outerWidth();
				var height = imgzoom.outerHeight();
				var left = (jQuery(window).width() - width) / 2 + jQuery(window).scrollLeft();
				var	top = (jQuery(window).height() - height) / 2 + jQuery(window).scrollTop();

				// Now add close-button and stuff (we don't want them in the dimensions-calculation)
				imgzoom.addClass('imgzoom').append('<a href="#">Close</a>' +description);

				// These are the dimensions of the imgzoom
				var newDim = {
					width: width,
					height: height, 
					left: left, 
					top: top, 
					opacity: 1, 
					overflow: 'auto'
				};

				// Set imgzoom's dimensions to clicked element's, animate to new, onclick; animate back and remove
				imgzoom.css(oldDim).animate(newDim, config.speed);

				// Close imgzoom on-close-link-click (only link in imgzoom)
				$('a', imgzoom).click(function() {
					imgzoom.animate(oldDim, config.speed, function() {
						imgzoom.remove();
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