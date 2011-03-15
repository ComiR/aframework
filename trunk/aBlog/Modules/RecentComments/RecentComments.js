aFramework.modules.RecentComments = {
	run: function () {
		this.hijaxPrevNextLinks();
	}, 

	hijaxPrevNextLinks: function () {
		jQuery('#recent-comments ul a').click(function () {
			var clicked = jQuery(this);
			var oldText = clicked.text();

			clicked.text(Lang.get('Loading...'));

			jQuery.get(Router.urlForModule('RecentComments') + '&' + clicked.attr('href').substr(1), function (data) {
				if (data == '') {
					clicked.parent().html(oldText);
				}
				else {
					jQuery('#recent-comments').html(data);
					aFramework.modules.RecentComments.run();
				}
			});

			return false;
		});
	}
};
