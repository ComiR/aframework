/**
 * @title:		Form Hints
 * @version:	1.0
 * @author:		Andreas Lagerkvist
 * @date:		2008-09-15
 * @url:		http://andreaslagerkvist.com/jquery/form-hints/
 * @license:	http://creativecommons.org/licenses/by/3.0/
 * @copyright:	2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * @requires:	jQuery
 * @usage:		jQuery.formHints(); Gives all form-controls with a title-attribute a default-value that disappears onclick.
 **/
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