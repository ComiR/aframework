aFramework.modules.RandomJqueryPlugins = {
	run: function() {
		this.hijaxMoreLink();
	}, 

	hijaxMoreLink: function() {
		jQuery('#random-jquery-plugins p a').click(function() {
			jQuery(this).text('Loading...');

			jQuery.get('/?module=RandomJqueryPlugins', function(data) {
				jQuery('#random-jquery-plugins').html(data);

				aFramework.modules.RandomJqueryPlugins.run();
			});

			return false;
		});
	}
};