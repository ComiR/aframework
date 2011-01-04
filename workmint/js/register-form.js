WM.modules.RegisterForm = {
	init: function () {
		this.fancySubmit();
		this.hijaxForm();
	}, 

	// Hijaxes the register-form
	hijaxForm: function () {
		$('#register-form form').ajaxForm({
			// Make sure all required fields are filled out before submitting form
			beforeSubmit: function () {
				if (!$('#register-form .jquery-live-validation-on').length) {
					WM.modules.RegisterForm.liveValidation();
				}

				// If they are, change button text to "Loading"
				if (!$('#register-form').find('img[src=' + TEMPLATE_PATH + '/css/gfx/invalid.gif]').length) {
					$('#register-form a.jquery-form-to-link').text('Loading...');

					return true;
				}

				// If not alert a warning and don't submit form
				alert('Please fill out all required fields');

				return false;
			}, 
			// If some unexpected error occurrs
			error: function () {
				// Change button text back
				$('#register-form a.jquery-form-to-link').text($('#register-form input[type=submit]').val());

				alert('An unexpected error occurred, please reload the page and try again.');
			}, 
			// After form has been submitted, make sure the backend didn't return an error
			success: function (data) {
				var json = data.length ? eval('(' + data + ')') : {};

				// Change the button text back
				$('#register-form a.jquery-form-to-link').text($('#register-form input[type=submit]').val());

				// If it did, alert the error
				if (json.error) {
					alert(json.error);
				}
				// If no error occurred, redirect to admin-page
				else if (json.success) {
					window.location = '/Welcome/';
				}
				else {
					alert('An unexpected error occurred, please reload the page and try again.');
				}
			}
		});
	}, 

	// Turn the boring submit button into a fancy one
	fancySubmit: function () {
		$('#register-form input[type=submit]').hide().formToLink();
	}, 

	// Validate the form fields as the user types
	liveValidation: function () {
		// Recruit validation
		if ($('#register-form.recruit').length) {
			var validationConfig = {
				validIco:	TEMPLATE_PATH + '/css/gfx/valid.gif', 
				invalidIco:	TEMPLATE_PATH + '/css/gfx/invalid.gif', 
				required:	['company', 'alias', 'orgNum', 'street', 'zip', 'city', 'firstName', 'lastName', 'email', 'phone', 'password'], 
				fields:		{
					company:	/^.+$/,
					alias:		/^.+$/,
					orgNum:		/^.+$/,
					street:		/^.+$/,
					zip:		/^.+$/,
					city:		/^.+$/,
					firstName:	/^.+$/,
					lastName:	/^.+$/,
					password:	/^.+$/,
					phone:		/^.+$/
				}
			};

			$('#register-form').liveValidation(validationConfig);
		}
		// Candidate validation
		else {
			// We can use the liveValidation plug-in for most fields
			var validationConfig = {
				validIco:	TEMPLATE_PATH + '/css/gfx/valid.gif', 
				invalidIco:	TEMPLATE_PATH + '/css/gfx/invalid.gif', 
				required:	['firstName', 'lastName', 'password', 'email'], 
				fields:		{
					firstName:	/^.+$/, 	// Regexp for first name
					lastName:	/^.+$/, 	// Regexp for last name
					password:	/^.+$/		// Regexp for password
				}
			};

			$('#register-form').liveValidation(validationConfig);

			// Special case for birthdate
			var year		= $('#register-form select[name=year]');
			var month		= $('#register-form select[name=month]');
			var day			= $('#register-form select[name=day]');
			var bdValidator	= $('<img src="' + validationConfig.invalidIco + '" alt=""/>').insertAfter(day);

			var validateBD = function () {
				if (
					year.val() != -1 && 
					month.val() != -1 && 
					day.val() != -1
				) {
					bdValidator.attr('src', validationConfig.validIco);
				}
				else {
					bdValidator.attr('src', validationConfig.invalidIco);
				}
			};

			validateBD();

			year.change(validateBD);
			month.change(validateBD);
			day.change(validateBD);
		}

		// Both register-forms: special case for second password
		var pass			= $('#register-form input[name=password]');
		var passAgain		= $('#register-form input[name=passwordRepeat]');
		var passValidator	= $('<img src="' + validationConfig.invalidIco + '" alt=""/>').insertAfter(passAgain);

		var validatePass = function () {
			if (passAgain.val() != '' && passAgain.val() == pass.val()) {
				passValidator.attr('src', validationConfig.validIco);
			}
			else {
				passValidator.attr('src', validationConfig.invalidIco);
			}
		};

		validatePass();

		passAgain.keyup(validatePass);
	}
};
