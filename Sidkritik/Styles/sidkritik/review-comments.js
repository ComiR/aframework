(function () {
	$('#site-reviews > ol > li > div').each(function () {
		var div		= $(this);		
		var heading	= div.find('h5');
		var numComm	= div.is('.comments') ? ' (' + div.find('> ol > li').length + ')' : '';
		var link	= $('<a href="#">' + heading.text().toLowerCase() + numComm + '</a>').appendTo(heading.html(''));

		link.click(function () {
			div.toggleClass('visible');

			return false;
		});
	});
})();
