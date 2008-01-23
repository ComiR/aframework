/**
 * Adds OK/Not Ok-icons next to 'formControls'
 * that indicates whether said control's value is valid
 *
 * @class liveValidation
 * @param {Object} conf, custom config-object
 */
jQuery.fn.liveValidation = function(conf) {
	var config = {
		formControls: 'input[type="text"], textarea',	// form-controls to be validated
		action: '/mod/FormValidator/',					// url to validator-back-end
		validIco: '',
		invalidIco: '', 
		valid: 'Valid', 
		invalid: 'Invalid'
	};
	config = $.extend(config, conf);

	return this.each(function() {
		var form = $(this);

		if(form.is('form')) {
			$(config.formControls, form).each(function() {
				var t = $(this);
				var validator = $('<img src="' +config.invalidIco +'" alt="' +config.invalid +'" />').insertAfter(t);

				var validate = function() {
					$.get(config.action +'?' +t.attr('name') +'=' +t.val(), function(d) {
						if(parseInt(d, 10)) {
							if(validator.attr('alt') != config.valid) {
								validator.attr('src', config.validIco);
								validator.attr('alt', config.valid);
							}
						}
						else if(validator.attr('alt') != config.invalid) {
							validator.attr('src', config.invalidIco);
							validator.attr('alt', config.invalid);
						}
					});
				};

				if(t.val().length) {
					validate();
				}
				t.keyup(validate);
			});
		}
	});
};