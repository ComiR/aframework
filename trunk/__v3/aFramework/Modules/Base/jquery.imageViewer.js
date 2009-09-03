/**
@title:
Image Viewer

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2009-09-03

@url:
http://andreaslagerkvist.com/jquery/image-viewer/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.imageViewer.css, jquery.center.js

@does:
Makes links pointing to images open in the "Image Viewer". The Image Viewer centers on screen and displays all the other images in the same scope beneath the currently displayed image. Lorem ipsum dolor sit amet.

@howto:
jQuery('#holiday-photos, #flickr-images').imageViewer(); would create Image Viewer-albums from the two elements #holiday-photos and #flickr-images

@exampleHTML:
<ul>
	<li><a href="http://exscale.se/__files/3d/bloodcells.jpg">Bloodcells</a></li>
	<li><a href="http://exscale.se/__files/3d/x-wing.jpg">X-Wing</a></li>
	<li><a href="http://exscale.se/__files/3d/weve-moved.jpg">We've moved</a></li>
</ul>

<ul>
	<li><a href="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01.jpg"><img src="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01_small.jpg" alt="Lamp and Mates" /></a></li>
	<li><a href="http://exscale.se/__files/3d/stugan-winter.jpg"><img src="http://exscale.se/__files/3d/stugan-winter_small.jpg" alt="The Cottage - Winter time" /></a></li>
	<li><a href="http://exscale.se/__files/3d/ps2.jpg"><img src="http://exscale.se/__files/3d/ps2_small.jpg" alt="PS2" /></a></li>
</ul>

@exampleJS:
jQuery('#jquery-image-viewer-example ul').imageViewer();
**/
jQuery.fn.imageViewer = function (conf) {
	// Config for plug-in
	var config = jQuery.extend({
		id:				'jquery-image-viewer', 	// ID of image viewer container
		show:			'show', 				// Show-animation for imgbox
		hide:			'hide', 				// Hide-animation for imgbox
		speed:			0, 						// Animation-speed
		loadingText:	'Loading...'
	}, conf);

	// These are LinksThatPointToImages
	var ltpti = 'a[href$=.jpg], a[href$=.bmp], a[href$=.gif], a[href$=.png]';

	// Create imgbox container, loader and overlay if not already created
	if(!jQuery('#' + config.id).length) {
		jQuery('<div id="' + config.id + '"></div>').appendTo('body').hide();
		jQuery('<div id="' + config.id + '-loading">' + config.loadingText + '</div>').appendTo('body').hide();
		jQuery('<div id="' + config.id + '-overlay"></div>').appendTo('body').hide();
	}

	// For every container of links that point to images
	return this.each(function () {
		// Create list of images in this scope that will be used as navigation in this "album"
		var loi	= '<ul>';
		var i	= 0;

		jQuery(this).find(ltpti).each(function() {
			var t		= jQuery(this);
			var alt		= t.find('img').length ? t.find('img').attr('alt') : '';
			var	title	= t.attr('title') || '';
			var	href	= t.attr('href');
			var thumb	= href;

			// You can remove this if-statement if you like, in my framework (aFramework) all images
			// with a _small suffix are run through Thumb.php, if you have a thumb.php of your own
			// then alter the thumb-var accordingly to speed things up. Firefox gets really slow
			// displaying more than ~10 ~>=800x600 images, i've set my thumb-script to 100x* and quality=10.
			// Because I use the same files as those up for download this is unfortunately needed. Sorry!
			if(typeof(aFramework) === 'object') {
				thumb = href.substr(0, href.length - 4) + '_small' + href.substr(href.length - 4) + '?w=100&amp;q=10';
			}

			loi += '<li><a href="' + href + '" title="' + title + '"><img src="' + thumb + '" alt="' + alt + '" /></a></li>';

			i++;
		});

		loi += '</ul>';

		// No need for navigation if there's just one image
		if(i === 1) {
			loi = '';
		}

		var onLinkClick = function() {
			// Get information to display in imgbox
			var t			= jQuery(this);
			var href		= t.attr('href');
			var title		= t.attr('title');
			var alt			= t.find('img').attr('alt');
			var imgTitle	= (title === undefined) ? '' : '<h2>' + title + '</h2>';
			var imgSrc		= (href === undefined) ? '' : '<p><a href="#" id="' + config.id + '-image" title="View only image"><img src="' + href + '" alt="" /></a></p>';
			var imgDesc		= (alt === undefined) ? '' : '<p>' + alt + '</p>';
			var close		= '<a href="#" id="' + config.id + '-close" title="Close">Close</a>';
			var imgboxHtml	= imgTitle + imgSrc + imgDesc + loi + close;

			// Hide loading, display imgbox and run self on #imgbox (so the list of images acts
			// as navigation) also add .selected class to currently displayed image in list of images
			var displayImageViewer = function() {
				jQuery('#' + config.id + '-loading')
					.hide();

				jQuery('#' + config.id)
					.html(imgboxHtml)[config.show](config.speed)
					.center()
					.imageViewer()
					.find('a[href="' +href +'"]')
						.addClass('selected');

				// Close-link
				jQuery('#' + config.id + '-close').click(function() {
					jQuery('#' + config.id)[config.hide](config.speed);
					jQuery('#' + config.id + '-loading').hide();
					jQuery('#' + config.id + '-overlay').hide();

					return false;
				});

				// Image-link
				jQuery('#' + config.id + '-image').click(function() {
					window.location = jQuery(this).find('img').attr('src');

					return false;
				});
			};

			// Preload image
			var preload = new Image();

			preload.src = jQuery(this).attr('href');

			if(preload.complete) {
				jQuery('#' +config.id +'-overlay').show();
				displayImageViewer();
			}
			else {
				jQuery('#' + config.id +'-overlay').show();
				jQuery('#' + config.id +'-loading').show();

				preload.onload = function() {
					displayImageViewer();
				};
			}

			return false;
		};

		// Apply imgbox click-event to all links in the scope, but first unbind same
		// function in case plugin is run twice (after ajax-generated content for example)
		jQuery(this).find(ltpti).unbind('click', onLinkClick).click(onLinkClick);
	});
};