/**
 * FormHints 1.0
 *
 * Allows form controls to have default "hints" that disappears onclick.
 * Affects all form-controls with title-attributes (<input title="A hint" />
 *
 * Usage: jQuery.formHints();
 *
 * @class formHints
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
jQuery.formHints = function(conf) {
	var config = jQuery.extend({
		formControls: 'input[title], textarea[title]', 
		className: 'default-value'
	}, conf);

	$(config.formControls).each(function() {
		var t = $(this);

		if(t.val() === '' || t.val() == t.attr('title')) {
			t.addClass(config.className).val(t.attr('title'));
		}
	})
	.focus(function() {
		var t = $(this);

		if(t.val() == t.attr('title')) {
			t.val('').removeClass(config.className);
		}
	})
	.blur(function() {
		var t = $(this);

		if(t.val() === '' || t.val() == t.attr('title')) {
			t.addClass(config.className).val(t.attr('title'));
		}
	});
};