aFramework.modules.Contact = {
	run: function () {
		this.hijaxForm();
	}, 

	hijaxForm: function () {
		jQuery('#contact form')
			.liveValidation({
				validIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-valid.png', 
				invalidIco:	WEBROOT + 'aFramework/Styles/gfx/jquery.liveValidation-invalid.png', 
				required:	['name', 'email']
			})
			.ajaxForm({
				url:		WEBROOT + '?module=Contact', 
				success:	function (data) {
								jQuery('#contact').html(data);
								aFramework.modules.Contact.run();
							}
			});
	}
};