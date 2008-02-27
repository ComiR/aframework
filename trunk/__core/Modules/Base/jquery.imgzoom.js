/**
 * Imgzoom 1.0 (Requires the dimensions-plugin)
 *
 * Opens links that point to images in the "ImgZoom" (zooms out the image)
 *
 * Usage: $.imgzoom();
 * 
 * Todo: 
 * 	- underlay (fixed div), 
 * 	- meassure div's dimensions wiv only img in there and add close, description and class last (so no styling can fook wiv dimesnions), 
 * 	- position fixed after animation, re-animate on close, (?)
 * 	- prevent same image from opening twice (give it ID?) (#imgzoom-filename?)
 * 	- shoouldn't only display image onload, also if already loaded? (had problems wiv this on imgbox i remember.. doesn't seem to happen here so far...) (ie only no?)
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
			var imgSrc = clickedElement.getAttribute('href');

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

			// Preload image
			var preload = new Image();
			preload.src = imgSrc;

			// Onload
			preload.onload = function() {
				// Append image to body
				var imgzoom = jQuery('<div class="imgzoom"></div>').html('<a href="#">Close</a><img src="' +imgSrc +'" alt="" />' +description).appendTo(document.body).css({position: 'absolute'});

				// Get its dimensions
				var width = imgzoom.outerWidth();
				var height = imgzoom.outerHeight();
				var left = (jQuery(window).width() - width) / 2 + jQuery(window).scrollLeft();
				var	top = (jQuery(window).height() - height) / 2 + jQuery(window).scrollTop();
				var newDim = {
					width: width,
					height: height, 
					left: left, 
					top: top, 
					opacity: 1
				};

				// Set its dimensions to clicked element's, animate to new, onclick; animate back and remove
				imgzoom.css(oldDim).animate(newDim, config.speed);

				// Close imgzoom on-close-link-click (only link in imgzoom)
				$('a', imgzoom).click(function() {
					imgzoom.animate(oldDim, config.speed, function() {
						imgzoom.remove();
					});

					return false;
				});
			};

			return false;
		}
	});
};