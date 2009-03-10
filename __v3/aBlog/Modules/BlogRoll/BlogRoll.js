aFramework.modules.BlogRoll = {
	run: function (  ) {
		this.addFavicons();
		this.addRefreshLink();
	}, 

	addFavicons: function (  ) {
		jQuery('#blog-roll').favicons({
			insert:		'insertAfter', 
			defaultIco:	WEBROOT + 'aFramework/Styles/__common/gfx/jquery.favicons.png'
		});
	}, 

	addRefreshLink: function (  ) {
		jQuery('<p><a href="#">' + Lang.get('get_some_new_links') + '</a></p>').appendTo('#blog-roll').find('a').click(function() {
			jQuery(this).text(Lang.get('loading') + '...');

			jQuery('#blog-roll').load(WEBROOT + '?module=BlogRoll', function() {
				aFramework.modules.BlogRoll.run();
			});

			return false;
		});
	}
};