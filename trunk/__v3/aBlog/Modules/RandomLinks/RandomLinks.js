aFramework.modules.RandomLinks = {
	run: function () {
		this.addFavicons();
		this.addRefreshLink();
	}, 

	addFavicons: function () {
		jQuery('#random-links').favicons({
			insert:		'insertAfter', 
			defaultIco:	WEBROOT + 'aFramework/Styles/__common/gfx/jquery.favicons.png'
		});
	}, 

	addRefreshLink: function () {
		jQuery('<p><a href="#">' + Lang.get('get_some_new_links') + '</a></p>')
			.appendTo('#random-links')
			.find('a')
			.click(function () {
				jQuery(this).text(Lang.get('loading') + '...');

				jQuery('#random-links').load(WEBROOT + '?module=RandomLinks', function () {
					aFramework.modules.RandomLinks.run();
				});

				return false;
			});
	}
};