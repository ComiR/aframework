/***
@title:
Live Validation

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/live-validation/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jQuery

@does:
This plug-in adds valid/invalid icons next to required form-controls in a given form.

@usage:
jQuery('#contact form').liveValidation();

@exampleHTML:
<form method="post" action="">

	<p>
		<label>
			Name<br />
			<input type="text" name="name" />
		</label>
	</p>

	<p>
		<label>
			Email<br />
			<input type="text" name="email" />
		</label>
	</p>

	<p>
		<label>
			Foo<br />
			<input type="text" name="foo" />
		</label>
	</p>

	<p>
		<label>
			Bar<br />
			<input type="text" name="bar" />
		</label>
	</p>

</form>

@exampleJS:
jQuery('#jquery-live-validation-example form').liveValidation({
	validIco: '/aFramework/Styles/__common/gfx/form-control-valid.png', 
	invalidIco: '/aFramework/Styles/__common/gfx/form-control-valid.png'
}, {
	foo: /^\w+$/
});
***/
jQuery.fn.liveValidation = function(conf, addedFields) {
	var config = jQuery.extend({
		formControls:	'input[type="text"], textarea',						// form-controls to be validated
		validIco:		'',													// src to valid icon
		invalidIco:		'',													// src to invalid ico
		valid:			'Valid',											// alt for valid icon
		invalid:		'Invalid'											// alt for invalid icon
	}, conf);

	var commonFields = jQuery.extend({
		name: 			/^\w+$/,											// name (atleast one character)
		title: 			/^\w+$/,											// title (atleast one character)
		author: 		/^\w+$/,											// author (atleast one character)
		message: 		/^\w+$/,											// message (atleast one character)
		comment: 		/^\w+$/,											// comment (atleast one character)
		description:	/^\w+$/,											// description (atleast one character)
		dimensions:		/^\d+x\d+$/,										// dimensions (DIGITxDIGIT)
		price:			/^\d+$/,											// price (atleast one digit)
		url: 			/^(http:\/\/)?(www)?([^ |\.]*?)\.([^ ]){2,5}$/,		// url
		email: 			/^.+?@.+?\..{2,4}$/									// email
	}, addedFields);

	return this.each(function() {
		var form = jQuery(this);

		// For every form-control in the form
		jQuery(config.formControls, form).each(function() {
			var t = jQuery(this);

			// Don't do anything if this field isn't required
			if(typeof(commonFields[t.attr('name')]) === 'undefined') {
				return;
			}

			// Add invalid icon
			var validator = jQuery('<img src="' +config.invalidIco +'" alt="' +config.invalid +'" />').insertAfter(t);

			// This function is run now and on key up
			var validate = function() {
				var key = t.attr('name');
				var val = t.val();
				var tit = t.attr('title');

				// If value and title are the same it is assumed formHints is used
				// set value to empty so validation isn't done on the hint
				val = tit == val ? '' : val;

				// Make sure the value matches
				if(val.match(commonFields[key])) {
					// If it's not already valid
					if(validator.attr('alt') != config.valid) {
						validator.attr('src', config.validIco);
						validator.attr('alt', config.valid);
					}
				}
				// It didn't validate
				else {
					// If it's not already invalid 
					if(validator.attr('alt') != config.invalid) {
						validator.attr('src', config.invalidIco);
						validator.attr('alt', config.invalid);
					}
				}
			};

			validate();
			t.keyup(validate);
		});

		// If form contains any invalid icon on submission, return false
		form.submit(function() {
			if(form.find('img[src="' +config.invalidIco +'"]').length) {
				return false;
			}
		});
	});
};