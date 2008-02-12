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
	jQuery(document.body).click(function(ev) {
		// Get the clicked element
		var el = ev.target;

		// If the clicked element is not an anchor, see if any of its parents is (use jQuery.fn.parents() instead?)
		if(el.nodeName.toLowerCase() != 'a') {
			while(el.nodeName.toLowerCase() != 'a' && el.nodeName.toLowerCase() != 'body') {
				el = el.parentNode;
			}
		}

		// If clicked element (or any of its parents) has an 'href'-attribute matching the image-reg-exp, continue
		if(el.nodeName.toLowerCase() == 'a' && el.getAttribute('href').search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1) {
			// Store dimensions of clicked link (or image in case there is one (dimensions returns bad dimensions for inline-elements containing images(?))
			var imgSrc = el.getAttribute('href');
			var e = jQuery(el).find('img');
			if(!e.length) {
				e = jQuery(el);
			}
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
				var img = jQuery('<img src="' +imgSrc +'" alt="" class="imgzoom" />').appendTo(document.body).css({position: 'absolute'});

				// Get its dimensions
				var width = img.outerWidth();
				var height = img.outerHeight();
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
				img.css(oldDim).animate(newDim, config.speed).click(function() {
					jQuery(this).animate(oldDim, config.speed, function() {
						jQuery(this).remove();
					});
				});
			};

			return false;
		}
	});
};