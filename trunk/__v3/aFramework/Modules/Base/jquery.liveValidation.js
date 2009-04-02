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
jquery, jquery.liveValidation-valid.png, jquery.liveValidation-invalid.png

@does:
Use this plug-in to add live validation to any form on your page. The plug-in indicates whether a form control is valid or not by switching between any icons of you choosing as the user types.

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
jQuery('#jquery-live-validation-example').liveValidation({
	validIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-valid.png', 
	invalidIco: WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-invalid.png', 
	required:	['name', 'email', 'foo'], 
	fields:		{foo: /^\S.*$/}
});
***/
jQuery.fn.liveValidation = function (conf, addedFields) {
	var config = jQuery.extend({
		validIco:		'',													// src to valid icon
		invalidIco:		'',													// src to invalid ico
		valid:			'Valid',											// alt for valid icon
		invalid:		'Invalid',											// alt for invalid icon
		validClass:		'valid',											// valid class
		invalidClass:	'invalid',											// invalid class
		required:		[],													// json/array of required fields
		fields:			{}													// json of fields and regexps
	}, conf);

	var fields = jQuery.extend({
		name: 			/^\S.*$/,											// name (at least one character)
		title: 			/^\S.*$/,											// title (at least one character)
		author: 		/^\S.*$/,											// author (at least one character)
		message: 		/^\S.*$/,											// message (at least one character)
		comment: 		/^\S.*$/,											// comment (at least one character)
		content: 		/^\S.*$/,											// "content" (at least one character)
		description:	/^\S.*$/,											// description (at least one character)
		dimensions:		/^\d+x\d+$/,										// dimensions (DIGITxDIGIT)
		price:			/^\d+$/,											// price (at least one digit)
		url: 			/^(http:\/\/)?(www)?([^ |\.]*?)\.([^ ]){2,5}$/,		// url
		email: 			/^.+?@.+?\..{2,4}$/									// email
	}, config.fields);

	var formControls = config.required;

	if (!formControls.length) {
		return this;
	}

	for (var i in formControls) {
		formControls[i] = ':input[name=' + formControls[i] + ']';
	}

	formControls = formControls.join(',');

	return this.each(function () {
		jQuery(formControls, this).each(function () {
			var t = jQuery(this);

			if (t.is('.jquery-live-validation-on')) {
				return;
			}
			else {
				t.addClass('jquery-live-validation-on');
			}

			// Add invalid icon
			var validator = jQuery('<img src="' + config.invalidIco + '" alt="' + config.invalid + '" />').insertAfter(t.addClass(config.invalidClass));

			// This function is run now and on key up
			var validate = function () {
				var key = t.attr('name');
				var val = t.val();
				var tit = t.attr('title');

				// If value and title are the same it is assumed formHints is used
				// set value to empty so validation isn't done on the hint
				val = tit == val ? '' : val;

				// Make sure the value matches
				if (val.match(fields[key])) {
					// If it's not already valid
					if (validator.attr('alt') != config.valid) {
						validator.attr('src', config.validIco);
						validator.attr('alt', config.valid);
						t.removeClass(config.invalidClass).addClass(config.validClass);
					}
				}
				// It didn't validate
				else {
					// If it's not already invalid 
					if (validator.attr('alt') != config.invalid) {
						validator.attr('src', config.invalidIco);
						validator.attr('alt', config.invalid);
						t.removeClass(config.validClass).addClass(config.invalidClass);
					}
				}
			};

			validate();
			t.keyup(validate);
		});

		// If form contains any invalid icon on submission, return false
		jQuery('form', this).submit(function () {
			return !jQuery(this).find('img[alt="' + config.invalid + '"]').length;
		});
	});
};