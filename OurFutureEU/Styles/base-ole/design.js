aFramework.styles.BaseOLE = {
	run: function () {
		this.documentsIcons();

		this.onWindowOnload.push(aFramework.styles.BaseOLE.selfClearPositionAbsolute);
		this.onWindowOnload.push(aFramework.styles.BaseOLE.projectTabs);

		$(window).load(function () {
			for (var func in aFramework.styles.BaseOLE.onWindowOnload) {
				if (typeof(aFramework.styles.BaseOLE.onWindowOnload[func]) == 'function') {
					aFramework.styles.BaseOLE.onWindowOnload[func]();
				}
			}
		});
	}, 

	onWindowOnload: [], 

	documentsIcons: function () {
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
	}, 

	selfClearPositionAbsolute: function () {
		$('#contact-persons li').each(function () {
			var minHeight = parseInt($(this).find('img').outerHeight(), 10) + 35;

			$(this).css('min-height', minHeight + 'px');
		});
	}, 

	projectTabs: function () {
		if (document.getElementById('project-page-page')) {
			// Add tab-list
			$('<ul id="project-tabs"><li><a href="#page">' 
				+ Lang.get('About') 
				+ '</a></li><li><a href="#contact-persons">' 
				+ Lang.get('Contact') 
				+ '</a></li><li><a href="#documents">' 
				+ Lang.get('Documents') 
				+ '</a></li></ul>').insertAfter('#project-list').superSimpleTabs();

			// Move the heading above the tabs
			$('#page h2').prependTo('#primary-content');
		}
	}
};
