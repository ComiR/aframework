aFramework.modules.PhotoAlbum = {
	run: function () {
		this.confirmDelete();
	}, 

	confirmDelete: function () {
		$('#photo-album li form').submit(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
