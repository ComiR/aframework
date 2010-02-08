(function () {
	var Top5SitesScroll = function () {
		var top5Sites = $('#top-5sites');

		if (top5Sites.length) {
			var pos				= 0;
			var scrollContainer	= top5Sites.scrollTo(0, {axis: 'y'});
			var itemsList		= scrollContainer.find('> ol');
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

	Top5SitesScroll();
})();
