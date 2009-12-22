(function () {
	var aFrameworkUsersModule = function () {
		// Scroll aFramework Users and make it "full page width"
		var aFrameworkUsers = $('#aframework-users');

		if (aFrameworkUsers.length) {
			// Full Page With
			aFrameworkUsers.fullPageWidthBar();

			// Scroll users
			var pos				= 0;
			var scrollContainer	= aFrameworkUsers.find('> div').scrollTo(0, {axis: 'y'});
			var items			= scrollContainer.find('> ul > li');
			var numItems		= items.length;

			setInterval(function () {
				var scrollTo = false;
				pos++;

				if (pos >= numItems) {
					pos = 0;
				}

				scrollContainer.scrollTo(items.eq(pos), {
					axis:		'y', 
					duration:	1000, 
					easing:		'easeOutQuad'
				});
			}, 7500);
		}
	};

	var homePageTabsModule = function () {
		// Home Page Tabs
		var aFrameworkWrapper = $('#aframework-wrapper');

		if (aFrameworkWrapper.length) {
			// Create tabs
			var tabs = '<div id="aframework-tabs"><ul>';

			aFrameworkWrapper.find('> div').each(function () {
				var div	= $(this);
				var h2	= div.find('h2');

				tabs += '<li><a href="#' + div.attr('id') + '">' + h2.html() + '</a></li>';
			});

			// Prepend them to the scrollContainer
			var scrollContainer = aFrameworkWrapper.parent().scrollTo(0, {axis: 'x'});

			$(tabs + '</ul></div>')
				.insertBefore(scrollContainer)
				.find('a')
					.click(function () {
						scrollContainer.scrollTo('#' + $(this).attr('href'), {
							axis:		'x', 
							duration:	1000, 
							easing:		'easeOutQuad'
						});

						return false;
					});
		}
	};

	// Home Page Accordion
	var homePageAccordionModule = function () {
		// First we have to recreate the HTML in a manner that jQuery.fn.accordion works
		// From semantic ul's and ol's to a bunch of divs unfortunately :(
		var doThese = $('#aframework-features, #aframework-quick-start');

		doThese.each(function () {
			var thisDiv			= $(this);
			var newHTML			= '<div id="' + thisDiv.attr('id') + '-accordion">';
			var toBeReplaced	= thisDiv.find('> ul, > ol');

			toBeReplaced.find('> li').each(function () {
				var li = $(this);

				newHTML += '<h3>' + li.find('h3').html() + '</h3><div>' + li.html().replace(/<h3>.*?<\/h3>/, '') + '</div>';
			});

			newHTML += '</div>';

			var newDiv = $(newHTML).replaceAll(toBeReplaced).accordion({
				fillHeight:	true
			});
		});
	};

	aFrameworkUsersModule();
//	homePageTabsModule();
	homePageAccordionModule();
})();
