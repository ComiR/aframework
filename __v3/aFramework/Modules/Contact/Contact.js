aFramework.modules.Contact = {
	run: function() {
		this.hijaxForm();
	}, 

	hijaxForm: function() {
		jQuery('#contact form').ajaxForm(function(data) {
			$('#contact').html(data);
			aFramework.modules.Contact.run();
		});
	}
};