aFramework.modules.DynItems = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#dyn-items td form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
