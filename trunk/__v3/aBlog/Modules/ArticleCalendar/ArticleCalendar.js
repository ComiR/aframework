aFramework.modules.ArticleCalendar = {
	run: function () {
		this.hijaxPrevNextLinks();
	}, 

	hijaxPrevNextLinks: function () {
		jQuery('#article-calendar ul a').click(function () {
			var clicked = jQuery(this);
			var oldText = clicked.text();
			var year	= clicked.attr('href').substr(-8).substr(0, 4);
			var month	= clicked.attr('href').substr(-3).substr(0, 2);

			clicked.text(Lang.get('Loading') + '...');

			jQuery.get(WEBROOT + '?module=ArticleCalendar&year=' + year + '&month=' + month, function (data) {
				if (data == '') {
					clicked.parent().html(oldText);
				}
				else {
					jQuery('#article-calendar').html(data);
					aFramework.modules.ArticleCalendar.run();
				}
			});

			return false;
		});
	}
};
