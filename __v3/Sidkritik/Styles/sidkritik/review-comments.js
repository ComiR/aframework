(function () {
	$('#site-reviews > ol > li > div').each(function () {
		var div		= $(this);		
		var heading	= div.find('h5');
		var link	= $('<a href="#">' + heading.text().toLowerCase() + '</a>').appendTo(heading.html(''));

		link.click(function () {
			div.toggleClass('visible');

			return false;
		});
	});
})();
