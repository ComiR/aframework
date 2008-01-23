aFramework.modules.Contact = {
	run: function() {
		this.hijaxForm();
		this.validateFields();
	}, 

	validateFields: function() {
		$('#contact form').liveValidation({
			validIco: '/__styles/__common/gfx/icons/form-control-valid.png', 
			invalidIco: '/__styles/__common/gfx/icons/form-control-invalid.png'
		});
	}, 

	hijaxForm: function() {
		$('#contact form').ajaxSubmit(function(data) {
			$('#contact').html(data);
			aFramework.modules.Contact.run();
		});
	}
};