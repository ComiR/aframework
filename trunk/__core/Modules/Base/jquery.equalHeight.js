/**
 * EqualHeight 1.0
 *
 * Copyright (c) 2007 Andreas Lagerkvist (exscale.se)
 */
jQuery.fn.equalHeight = function() {
	var height = 0, 
		maxHeight = 0;

	// Store the tallest element's height
	this.each(function() {
		var t = jQuery(this);
		height = t.height() + parseInt(t.css('paddingTop'), 10) + parseInt(t.css('paddingBottom'), 10) + parseInt(t.css('borderTopWidth'), 10) + parseInt(t.css('borderBottomWidth'), 10);
		maxHeight = (height > maxHeight) ? height : maxHeight;
	});

	// Set element's min-height to tallest element's height
	return this.each(function() {
		var t = jQuery(this);
			mh = maxHeight - (parseInt(t.css('paddingTop'), 10) + parseInt(t.css('paddingBottom'), 10) + parseInt(t.css('borderTopWidth'), 10) + parseInt(t.css('borderBottomWidth'), 10));
		t.css({minHeight: mh +'px'});
	});
};