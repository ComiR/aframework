aFramework.modules.ActivitiesAdmin = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#activities-admin li form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
