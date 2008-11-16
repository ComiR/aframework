aFramework.modules.Contact = {
	run: function() {
		this.hijaxForm();
	}, 

	hijaxForm: function() {
		jQuery('#contact form')
			.liveValidation({
				validIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-valid.png', 
				invalidIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-invalid.png'
			})
			.ajaxForm({
				url:		WEBROOT +'?module=Contact', 
				success:	function(data) {
								jQuery('#contact').html(data).liveValidation({
									validIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-valid.png', 
									invalidIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-invalid.png'
								});
								aFramework.modules.Contact.run();
							}
			});
	}
};