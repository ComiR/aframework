(function () {
	var theNewList = '<ul class="tabs">';

	$('#articles-by-date > ul > li').each(function (i) {
		var id = 'articles-by-date-month-' + i;

		$(this).attr('id', id);

		theNewList += '<li><a href="#' + id + '">' + $(this).find('h3').text() + '</a></li>';
	});

	theNewList += '</ul>';

	$(theNewList).insertAfter('#articles-by-date h2').superSimpleTabs();
})();