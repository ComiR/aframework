/**
 * ColourPicker 1.0
 *
 * Turns a <select>-element full of colours into an input with
 * a "colour-picker-icon" next to it that opens a dialogue which
 * allows user to pick any colour present in select
 *
 * Usage: jQuery('select[name="colour"]').colourPicker();
 *
 * @class equalHeight
 * @param {Object} conf, custom config-object
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */

/*
Here's a little php-function you can
use to generate "web safe" colours:

function gwsc() {
	$cs = array('00', '33', '66', '99', 'CC', 'FF');

	for($i=0; $i<6; $i++) {
		for($j=0; $j<6; $j++) {
			for($k=0; $k<6; $k++) {
				$c = $cs[$i] .$cs[$j] .$cs[$k];
				echo "<option value=\"$c\">#$c</option>\n";
			}
		}
	}
}

Use it like this:

<select name="colour">
	<?php gwsc(); ?>
</select>
*/
jQuery.fn.colourPicker = function(conf) {
	// Returns inverted hex-value (well, _should_ do that)
	function niceColour(hex) {
		// Todo...
		return 'ffffff';

		var r = hex.substr(0, 2), 
			g = hex.substr(2, 2), 
			b = hex.substr(4, 2);
	}

	// Config for plug-in
	var config = {
		ico: 'ico.gif',			// Icon user clicks to open dialog
		title: 'Pick a Colour',	// Heading in dialog
		inputBG: true,  		// Whether to change the input's background
		aniSpeed: 500			// Speed of colour picker show/hide animation
	};

	config = jQuery.extend(config, conf);

	// Create colour-picker container
	if(!jQuery('#colour-picker').length) {
		jQuery('<div id="colour-picker"></div>').appendTo('body').hide();
	}

	// Always return each...
	return this.each(function(i) {
		var select = jQuery(this);

		// Create colour-picker input
		var cpInput = '<input type="text" name="' +select.attr('name') +'" class="colour-picker-input" size="6" maxlength="6" />';

		// Create colour-picker icon
		var cpIco = '<a href="#" class="colour-picker-open"><img src="' +config.ico +'" alt="Open Colour-Picker" /></a>';

		// Create list of colours
		var loc = '';

		// Go through every option in select and store hex and title
		jQuery('option', select).each(function() {
			var hex = jQuery(this).val(), 
				title = jQuery(this).text();
	
			// What could you use instead of rel-attribute to store the hex-value? class mustn't start wiv a digit and href fooks wiv IE...
			loc += '<li><a href="#" title="' +title +'" rel="' +hex +'" style="background: #' +hex +'; colour: ' +niceColour(hex) +';">' +title +'</a></li>';
		});

		// Remove select, add input & icon
		jQuery(cpIco).insertAfter(select);
		jQuery(cpInput).insertAfter(select);
		select.remove();

		// If user clicks an icon
		jQuery('a.colour-picker-open').click(function() {
			// Get list of colours, the input and the icons top/left position (to position the colour-picker)
			var input = jQuery(this).prev('input.colour-picker-input'), 
				icoPos = jQuery(this).offset();

			// Fill colour picker wiv colours and show it (you can change the css() call to a center() call if you prefer (then u should prolly change the show-call to a fadeIn (and the hide to fadeOut)))
			jQuery('#colour-picker').html('<h2>' +config.title +'</h2><ul>' +loc +'</ul>').css({position: 'absolute', left: icoPos.left +'px', top: icoPos.top +'px'}).show(config.aniSpeed);

			// If user clicks link inside colour picker
			jQuery('#colour-picker a').click(function() {
				var hex = jQuery(this).attr('rel');

				// Set the input's value to clicked colour's hex
				input.val(hex);

				// Also change its background and colour
				if(config.inputBG) {
					input.css({background: '#' +hex, color: '#' +niceColour(hex)});
				}

				// Hide the container
				jQuery('#colour-picker').hide(config.aniSpeed);

				return false;
			});

			return false;
		});
	});
};