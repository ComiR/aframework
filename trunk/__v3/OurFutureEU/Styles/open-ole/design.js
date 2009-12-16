(function () {
	// Full-width bottom-bar
	var fullWidthBottomBar = function () {
		var docWidth = $(document).width();

		if (docWidth > 960) {
			var distance = (docWidth - 960) / 2;

			$('#tertiary-content, #footer').css({
				marginLeft:		'-' + distance + 'px', 
				marginRight:	'-' + distance + 'px', 
				paddingLeft:	distance + 'px', 
				paddingRight:	distance + 'px'
			});
		}
	};

	fullWidthBottomBar();
	$(window).resize(fullWidthBottomBar);

	// Give documents-type same bg as links
	$('#documents tr').each(function (i) {
		// Skip first row
		if (i) {
			var tr		= $(this);
			var tds		= tr.find('td');
			var link	= tds.eq(0).find('a');
			var span	= tds.eq(1).wrapInner('<span/>').find('span');
			var bgPos	= link.css('background-position').replace('0%', '100%');

			span.css({
				backgroundImage:	link.css('background-image'), 
				backgroundPosition:	bgPos, 
				backgroundRepeat:	link.css('background-repeat'), 
				paddingTop:			link.css('padding-top'), 
				paddingRight:		link.css('padding-left'), 
				paddingBottom:		link.css('padding-bottom'), 
				paddingLeft:		link.css('padding-right')
			});
		}
	});

	// Move the sun onscroll
	var win			= $(window);
	var wrapper		= $('#wrapper');
	var pageHeight	= $(document).height();
	var maxScroll	= pageHeight - $(window).height();

	var updateSunPosition	= function () {
		var scrollTop		= win.scrollTop();
		var percentScrolled	= scrollTop / maxScroll; // pageHeight;
		var sunPos			= Math.round(400 * percentScrolled - 400);
		//	sunPos			= sunPos > 0 ? 0 : sunPos;

		wrapper.css('background-position', '60% ' + sunPos + 'px');
	};

	updateSunPosition();
	win.scroll(updateSunPosition);

	// Things that need to happen after images have loaded
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
