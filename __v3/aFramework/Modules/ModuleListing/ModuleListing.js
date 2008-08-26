var ModuleListing = {
	init: function() {
		this.removeForms();
	}, 

	removeForms: function() {
		$('#module-listing form').remove();
	}
};

ModuleListing.init();