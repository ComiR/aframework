aFramework.modules.Contact = {
	run: function() {
		this.hijaxForm();
	}, 

	hijaxForm: function() {
		jQuery('#contact form').ajaxForm({
			url:		WEBROOT +'?module=Contact', 
			success:	function(data) {
							jQuery('#contact').html(data);
							aFramework.modules.Contact.run();
						}
		});
	}
};