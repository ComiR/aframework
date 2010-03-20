aFramework.modules.PhotoAlbums = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#photo-albums li form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
