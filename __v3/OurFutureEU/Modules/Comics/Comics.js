aFramework.modules.Comics = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#comics form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
