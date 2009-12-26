aFramework.modules.RandomArticleImages = {
	run: function () {
		$('<p><a href="#">' + Lang.get('Get some new images') + '</a></p>')
			.appendTo('#random-article-images')
			.find('a')
				.click(function () {
					$(this).text(Lang.get('Loading') + '...');

					$('#random-article-images').load(Router.urlForModule('RandomArticleImages'), function () {
						aFramework.modules.RandomArticleImages.run();
					});

					return false;
				});
	}
};
