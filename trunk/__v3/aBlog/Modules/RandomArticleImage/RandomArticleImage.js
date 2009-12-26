aFramework.modules.RandomArticleImage = {
	run: function () {
		$('<p><a href="#">' + Lang.get('Get a new image') + '</a></p>')
			.appendTo('#random-article-image')
			.find('a')
				.click(function () {
					$(this).text(Lang.get('Loading') + '...');

					$('#random-article-image').load(Router.urlForModule('RandomArticleImage'), function () {
						aFramework.modules.RandomArticleImage.run();
					});

					return false;
				});
	}
};
