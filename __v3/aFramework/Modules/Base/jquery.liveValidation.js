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
jquery, form-control-valid.png, form-control-invalid.png

@does:
Adds valid/invalid icons next to required form-controls.

@howto:
jQuery(document.body).liveValidation();

Run the plug-in on a parent-element of the form-controls you want to affect. If you run it on document.body every form-control in the document will get live validation.

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

	<p><input type="submit" value="Ok" /></p>

</form>

@exampleJS:
// I dont actually run it cus my site already uses liveValidation
//	jQuery(document.body).liveValidation({
//		validIco: '/aFramework/Styles/__common/gfx/form-control-valid.png', 
//		invalidIco: '/aFramework/Styles/__common/gfx/form-control-invalid.png'
//	}, {
//		foo: /^\w+$/
//	});
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
		name: 			/^\S.*$/,											// name (atleast one character)
		title: 			/^\S.*$/,											// title (atleast one character)
		author: 		/^\S.*$/,											// author (atleast one character)
		message: 		/^\S.*$/,											// message (atleast one character)
		comment: 		/^\S.*$/,											// comment (atleast one character)
		description:	/^\S.*$/,											// description (atleast one character)
		dimensions:		/^\d+x\d+$/,										// dimensions (DIGITxDIGIT)
		price:			/^\d+$/,											// price (atleast one digit)
		url: 			/^(http:\/\/)?(www)?([^ |\.]*?)\.([^ ]){2,5}$/,		// url
		email: 			/^.+?@.+?\..{2,4}$/									// email
	}, addedFields);

	return this.each(function() {
		jQuery(config.formControls, this).each(function() {
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
		jQuery('form', this).submit(function() {
			if(jQuery(this).find('img[src="' +config.invalidIco +'"]').length) {
				return false;
			}
		});
	});
};