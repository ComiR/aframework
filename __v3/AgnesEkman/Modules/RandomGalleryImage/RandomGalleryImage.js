aFramework.modules.RandomGalleryImage = {
	run: function () {
		$('<p><a href="#">' + Lang.get('Get a new image') + '</a></p>')
			.appendTo('#random-gallery-image')
			.find('a')
				.click(function () {
					$(this).text(Lang.get('Loading') + '...');

					$('#random-gallery-image').load(WEBROOT + '?module=RandomGalleryImage', function () {
						aFramework.modules.RandomGalleryImage.run();
					});

					return false;
				});
	}
};
