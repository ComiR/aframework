WM.modules.Login = {
	init: function () {
		if (!$('body.logged-in').length) {
			this.togglableForm();
		}

		this.hijaxForm();
	}, 

	hijaxForm: function () {
		$('#login form').ajaxForm({
			// Set button text to "Loading..." on submitting the form
			beforeSubmit: function () {
				var submit = $('#login input[type=submit]');

				submit.attr('title', submit.val()).val('Loading...');
			}, 
			// If some unexpected error occurrs
			error: function () {
				// Change button text back
				var submit = $('#login input[type=submit]');

				submit.val(submit.attr('title')).attr('title', '');

				alert('An unexpected error occurred, please reload the page and try again.');
			}, 
			// After form has been submitted, make sure the backend didn't return an error
			success: function (data) {
				var json = data.length ? eval('(' + data + ')') : {};

				// Change button text back
				var submit = $('#login input[type=submit]');

				submit.val(submit.attr('title')).attr('title', '');

				// If there was an error, alert it
				if (json.error) {
					alert(json.error);
				}
				// If not redirect to appropriate page
				else if (json.success) {
					window.location = json.success;
				}
				else {
					alert('An unexpected error occurred, please reload the page and try again.');
				}
			}
		});
	}, 

	togglableForm: function () {
		$('#login h2 a').click(function () {
			$(this).toggleClass('open');
			$('#login-form').toggle();

			if ($('#login-form').is(':visible')) {
				$('#login-form input[name=loginEmail]').focus();
			}

			return false;
		});
	}
};
