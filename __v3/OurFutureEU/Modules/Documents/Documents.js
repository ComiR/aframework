aFramework.modules.Documents = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#documents table form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
