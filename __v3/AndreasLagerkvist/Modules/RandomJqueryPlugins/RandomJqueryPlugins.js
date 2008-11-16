aFramework.modules.RandomJqueryPlugins = {
	run: function() {
		this.hijaxMoreLink();
	}, 

	hijaxMoreLink: function() {
		jQuery('#random-jquery-plugins p a').click(function() {
			jQuery(this).text('Loading...');

			jQuery('#random-jquery-plugins').load(WEBROOT +'?module=RandomJqueryPlugins', function() {
				aFramework.modules.RandomJqueryPlugins.run();
			});

			return false;
		});
	}
};