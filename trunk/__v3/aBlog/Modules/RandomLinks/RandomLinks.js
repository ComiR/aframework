aFramework.modules.RandomLinks = {
	run: function () {
		this.addFavicons();
		this.addRefreshLink();
	}, 

	addFavicons: function () {
		jQuery('#random-links').favicons({
			insert:		'insertAfter', 
			defaultIco:	WEBROOT + 'aFramework/Modules/Base/gfx/jquery.favicons.png'
		});
	}, 

	addRefreshLink: function () {
		jQuery('<p><a href="#">' + Lang.get('Get some new links') + '</a></p>')
			.appendTo('#random-links')
			.find('a')
			.click(function () {
				jQuery(this).text(Lang.get('Loading...'));

				jQuery('#random-links').load(Router.urlForModule('RandomLinks'), function () {
					aFramework.modules.RandomLinks.run();
				});

				return false;
			});
	}
};
