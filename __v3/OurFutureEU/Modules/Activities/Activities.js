aFramework.modules.Activities = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#activities li form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
