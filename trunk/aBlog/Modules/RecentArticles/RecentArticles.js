aFramework.modules.RecentArticles = {
	run: function () {
		this.hijaxPrevNextLinks();
	}, 

	hijaxPrevNextLinks: function () {
		jQuery('#recent-articles ul a').click(function () {
			var clicked = jQuery(this);
			var oldText = clicked.text();

			clicked.text(Lang.get('Loading...'));

			jQuery.get(Router.urlForModule('RecentArticles') + '&' + clicked.attr('href').substr(1), function (data) {
				if (data == '') {
					clicked.parent().html(oldText);
				}
				else {
					jQuery('#recent-articles').html(data);
					aFramework.modules.RecentArticles.run();
				}
			});

			return false;
		});
	}
};
