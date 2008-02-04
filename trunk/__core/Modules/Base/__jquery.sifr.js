/*
 * Sifr 1.0
 *
 * Requires the dimensions plug-in and nice-heading.php
 *
 * Copyright (c) 2007 Andreas Lagerkvist (exscale.se)
 */
jQuery.fn.sifr = function(conf) {
	var config = {
		font: 'ASENINE_.ttf', 
		copyPromt: false
	};

	config = $.extend(config, conf);

	// Always return each...
	return this.each(function() {
		// Get element's width, height, font-size, color and text
		var t = $(this), 
			p = t, 
			width = t.outerWidth(), 
			height = t.outerHeight(), 
			size = t.css('fontSize'), 
			color = t.css('color'), 
			str = t.text(), 
			bg = t.css('backgroundColor');

		if($.browser.safari && bg == 'rgba(0, 0, 0, 0)') {
			bg = 'transparent';
		}

		// Get nearest parent with background other than transparent
		// Something in here breaks firebug... wtf can that be?!
		// Ok, it DID, apparently not anymore
		while(bg == 'transparent' && p[0].tagName != 'body') {
			p = p.parent();
			bg = p.css('backgroundColor');
			if($.browser.safari && bg == 'rgba(0, 0, 0, 0)') {
				bg = 'transparent';
			}
		}

		// css() returns "rgb(rrr, ggg, bbb)" so we need to split the values up
		color = aFrameWork.utils.convRGB(color);
		bg = aFrameWork.utils.convRGB(bg);

		// Replace the fooka wiv an image
		t.html('<img class="sifr" src="/__core/Scripts/NiceHeading.php?str=' +str +'&width=' +width +'&height=' +height +'&bg_r=' +bg.r +'&bg_g=' +bg.g +'&bg_b=' +bg.b +'&color_r=' +color.r +'&color_g=' +color.g +'&color_b=' +color.b +'&size=' +size +'&font=' +config.font +'" alt="' +str +'" />');

		// Add copy-to-clipboard onClick
		if(config.copyPromt) {
			$('img.sifr').click(function() {
				var txt = $(this).attr('alt');
				if(confirm('Copy "' +txt +'" to clipboard?')) {
					aFrameWork.utils.copyToClipboard(txt);
				}
			});
		}
	});
};