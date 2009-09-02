aFramework.modules.Contact = {
	run: function () {
		this.hijaxForm();
	}, 

	hijaxForm: function () {
		var contact = jQuery('#contact form');

		contact
			.liveValidation({
				validIco:	WEBROOT + 'aFramework/Modules/Base/gfx/jquery.liveValidation-valid.png', 
				invalidIco:	WEBROOT + 'aFramework/Modules/Base/gfx/jquery.liveValidation-invalid.png', 
				required:	['name', 'email']
			})
			.ajaxForm({
				url:		WEBROOT + '?module=Contact', 
				beforeSubmit: function () {
					if (!contact.find('img[alt=' + aFramework.jQueryLiveValidation.invalid + ']').length) {
						contact.find('input[type=submit]').val(Lang.get('Sending') + '...');

						return true;
					}

					return false;
				}, 
				success:	function (data) {
					jQuery('#contact').html(data);
					aFramework.modules.Contact.run();
				}
			});
	}
};