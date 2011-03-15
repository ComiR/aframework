(function () {
	$('<p class="full-thumb-toggler"><a href="#">' + Lang.get('Toggle Full Size Thumbnail') + '</a></p>')
		.appendTo('#site')
		.find('a')
			.click(function () {
				$('#site p').toggleClass('full');

				return false;
			});
})();
