(function () {
	var aFrameworkUsersModule = function () {
		// Scroll aFramework Users and make it "full page width"
		var aFrameworkUsers = $('#aframework-users');

		if (aFrameworkUsers.length) {
			// Full Page With (works better when there's no way site is shorter than browser because of how firefox (and others) show and hide the scrollbar)
		//	aFrameworkUsers.fullPageWidthBar();

			// Scroll users
			var pos				= 0;
			var scrollContainer	= aFrameworkUsers.find('> div').scrollTo(0, {axis: 'y'});
			var itemsList		= scrollContainer.find('> ul');
			var items			= itemsList.find('> li');

			// Add first item to end of list as well so that we can scroll in a loop
			$('<li>' + items.eq(0).html() + '</li>').appendTo(itemsList);

				items			= itemsList.find('> li');
			var numItems		= items.length;

			setInterval(function () {
				pos++;
				var afterScroll = function () {};

				// We're scrolling to the last item
				if (pos == numItems - 1) {
					afterScroll = function () {
						scrollContainer.scrollTo('0', {axis: 'y'});
						pos = 0;
					};
				}

				scrollContainer.scrollTo(items.eq(pos), {
					axis:		'y', 
					duration:	1000, 
					easing:		'easeOutQuad', 
					onAfter:	afterScroll
				});
			}, 7500);
		}
	};

	// Home Page Accordion
	var homePageAccordionModule = function () {
		// First we have to recreate the HTML in a manner that jQuery.fn.accordion works
		// From semantic ul's and ol's to a bunch of divs unfortunately :(
		var doThese = $('#aframework-reasons, #aframework-features, #aframework-quick-start');

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
				fillHeight:	true, 
				active:		false
			});
		});
	};

	aFrameworkUsersModule();
	homePageAccordionModule();
})();
