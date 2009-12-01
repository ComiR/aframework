(function () {
	//console.dir($('#style-switcher option'));

	// Full-width bottom-bar
	var distance = ($(document).width() - 960) / 2;

	$('#tertiary-content, #footer').each(function () {
		var oldPaddingLeft = parseInt($(this).css('paddingLeft'), 10);
		var oldPaddingRight = parseInt($(this).css('paddingRight'), 10);

		$(this).css({
			marginLeft:		'-' + distance + 'px', 
			marginRight:	'-' + distance + 'px', 
			paddingLeft:	(distance + oldPaddingLeft) + 'px', 
			paddingRight:	(distance + oldPaddingRight) + 'px'
		});
	});

	window.onload = function () {
		// "Self-clear" absolutely positioned images
		$('#contact-persons li').each(function () {
			var minHeight = parseInt($(this).find('img').outerHeight(), 10) + 35;

			$(this).css('min-height', minHeight + 'px');
		});

		// Tabs on project pages
		if (document.getElementById('project-page-page')) {
			// Add tab-list
			$('<ul id="project-tabs"><li><a href="#page">' 
				+ Lang.get('About') 
				+ '</a></li><li><a href="#contact-persons">' 
				+ Lang.get('Contact') 
				+ '</a></li><li><a href="#documents">' 
				+ Lang.get('Documents') 
				+ '</a></li></ul>').prependTo('#primary-content').superSimpleTabs();

			// Move the heading above the tabs
			$('#page h2').prependTo('#primary-content');
		}
	};
})();
