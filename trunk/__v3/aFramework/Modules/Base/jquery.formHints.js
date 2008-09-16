/***
@title:
TODO: Form Hints

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/form-hints/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jQuery

@does:
Gives form-controls with a title-attribute a default-value that toggles visiblity onclick.

@usage:
jQuery(document.body).formHints(); would give every form-control with a title-attribute a hint.

@exampleHTML:
<p>
	<label>
		Dummy<br />
		<input type="text" name="dummy" title="E.G. Dummy" />
	</label>
</p>

@exampleJS:
// I'm not actually running it because my site already uses formHints
// jQuery('#jquery-form-hints-example').formHints();
***/
jQuery.fn.formHints = function(conf) {
	var config = jQuery.extend({
		formControls: 'input[title], textarea[title]', 	// Form-controls that should be affected by plug-in
		className: 'default-value'						// Class when form has its hint
	}, conf);
	
	// Remove hints on form submission
	jQuery('form').submit(function() {
		jQuery('.' +config.className, this).val('');
	});

	// For every element
	return this.each(function() {
		// Find form-controls
		jQuery(config.formControls, this).each(function() {
			var t = jQuery(this);

			if(t.val() === '' || t.val() == t.attr('title')) {
				t.addClass(config.className).val(t.attr('title'));
			}
		})
		.focus(function() {
			var t = jQuery(this);

			if(t.val() == t.attr('title')) {
				t.val('').removeClass(config.className);
			}
		})
		.blur(function() {
			var t = jQuery(this);

			if(t.val() === '' || t.val() == t.attr('title')) {
				t.addClass(config.className).val(t.attr('title'));
			}
		});
		
	});
};