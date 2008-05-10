/**
 * Imgzoom 1.2 (Requires the dimensions-plugin)
 *
 * Opens links that point to images in the "Imgzoom" (zooms out the image)
 *
 * Usage: jQuery.imgzoom();
 *
 * @class imgzoom
 * @param {Object} conf, custom config-object {speed: 500, dontFadeIn: 0, hideClicked: 0} // pelase note that i've removed the ability to fade in/out the zoomed image because it caused a bug in IE. If you don't care about IE uncomment the opacity-stuff on line ~50
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
jQuery.imgzoom = function(conf) {
	// Some config. If you set dontFadeIn: 0 and hideClicked: 0 imgzoom will act exactly like fancyzoom
	var config = jQuery.extend({
		speed: 200,		// Animation-speed of zoom
		dontFadeIn: 1,	// 1 = Do not fade in, 0 = Do fade in
		hideClicked: 1	// Whether to hide the image that was clicked to bring up the imgzoom
	}, conf);
	config.doubleSpeed = config.speed / 4; // Used for fading in the close-button

	// Set one click-event on body and then check what the target (actual) clicked element was
	// Doing it this way instead of applying an event to each link (like imgbox) supports dynamically inserted links
	jQuery(document.body).click(function(e) {
		// Make sure the target-element is a link (or an element inside a link)
		var clickedElement	= jQuery(e.target); // The element that was actually clicked
		var clickedLink		= clickedElement.is('a') ? clickedElement : clickedElement.parents('a'); // If it's not an a, check if any of its parents is
			clickedLink		= (clickedLink && clickedLink.is('a') && clickedLink.attr('href').search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) != -1) ? clickedLink : false; // If it was an a or child of an a, make sure it points to an image

		// Only continue if a link pointing to an image was clicked
		if(clickedLink) {
			var displayImgSrc = clickedLink.attr('href'); // The URI to the image we are going to display

			// If an imgzoom wiv this image is already open dont do nathin
			if(jQuery('div.imgzoom img[src="' +displayImgSrc +'"]').length) {
				return false;
			}

			// This function is run once the displayImgSrc-img has loaded (below)
			var preloadOnload = function() {
				// The clicked-link is faded out during loading, fade it back in
				clickedLink.css({opacity: '1'});

				// Now set some vars we need
				var linkContainsImg	= clickedLink.find('img').length;
				var dimElement		= linkContainsImg ? clickedLink.find('img') : clickedLink; // The element used to retrieve dimensions of imgzoom before zoom (either clicked link or img inside)
				var hideClicked		= linkContainsImg ? config.hideClicked : 0; // Whether to hide clicked link (set in config but always true for non-image-links)
				var offset			= dimElement.offset(); // Offset of clicked link (or image inside)
				var imgzoomBefore	= { // The dimensions of the imgzoom _before_ it is zoomed out
					width:		dimElement.outerWidth(), 
					height:		dimElement.outerHeight(), 
					left:		offset.left, 
					top:		offset.top/*, 
					opacity:	config.dontFadeIn*/
				};
				var imgzoom			= jQuery('<div><img src="' +displayImgSrc +'" alt="" /></div>').css({position: 'absolute'}).appendTo(document.body); // We don't want any class-name or any other contents part from the image when we calculate the new dimensions of the imgzoom
				var imgzoomAfter	= { // The dimensions of the imgzoom _after_ it is zoomed out
					width:		imgzoom.outerWidth(), 
					height:		imgzoom.outerHeight()/*, 
					opacity:	1*/
				};
				var windowDim = {
					width: jQuery(window).width(), 
					height: jQuery(window).height()
				};
				// Make sure imgzoom isn't wider than screen
				if(imgzoomAfter.width > windowDim.width) {
					var nWidth			= windowDim.width - 100;
					imgzoomAfter.height	= (nWidth / imgzoomAfter.width) * imgzoomAfter.height;
					imgzoomAfter.width	= nWidth;
				}
				// Now make sure it isn't taller
				if(imgzoomAfter.height > windowDim.height) {
					var nHeight = windowDim.height - 100;
					imgzoomAfter.width	= (nHeight / imgzoomAfter.height) * imgzoomAfter.width;
					imgzoomAfter.height	= nHeight;
				}
				// Center imgzoom
				imgzoomAfter.left	= (windowDim.width - imgzoomAfter.width) / 2 + jQuery(window).scrollLeft();
				imgzoomAfter.top	= (windowDim.height - imgzoomAfter.height) / 2 + jQuery(window).scrollTop();
				var closeButton		= jQuery('<a href="#">Close</a>').appendTo(imgzoom).hide(); // The button that closes the imgzoom (we're adding this after the calculation of the dimensions)

				// Hide the clicked link if set so in config
				if(hideClicked) {
					clickedLink.css({visibility: 'hidden'});
				}

				// Now animate the imgzoom from its small size to its large size, and then fade in the close-button
				imgzoom.addClass('imgzoom').css(imgzoomBefore).animate(imgzoomAfter, config.speed, function() {
					closeButton.fadeIn(config.doubleSpeed);
				});

				// This function closes the imgzoom
				var hideImgzoom = function() {
					closeButton.fadeOut(config.doubleSpeed, function() {
						imgzoom.animate(imgzoomBefore, config.speed, function() {
							clickedLink.css({visibility: 'visible'});
							imgzoom.remove();
						});
					});

					return false;
				};

				// Close imgzoom when you click the closeButton or the imgzoom
				imgzoom.click(hideImgzoom);
				closeButton.click(hideImgzoom);
			};

			// Preload image
			var preload = new Image();
				preload.src = displayImgSrc;

			if(preload.complete) {
				preloadOnload();
			}
			else {
				clickedLink.css({opacity: '0.5'});
				preload.onload = preloadOnload;
			}

			// Finally return false from the click so the browser doesn't actually follow the link...
			return false;
		}
	});
};