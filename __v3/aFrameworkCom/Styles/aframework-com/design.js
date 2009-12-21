(function () {
	// Scroll aFramework Users and make it "full page width"
	var aFrameworkUsers = $('#aframework-users');

	if (aFrameworkUsers.length) {
		aFrameworkUsers.fullPageWidthBar();

		// Scroll users
		var pos				= 0;
		var scrollContainer	= aFrameworkUsers.find('> div').scrollTo(0, {axis: 'x'});
		var items			= scrollContainer.find('> ul > li');
		var numItems		= items.length;

		setInterval(function () {
			var scrollTo = false;
			pos++;

			if (pos >= numItems) {
				pos = 0;
			}

			scrollContainer.scrollTo(items.eq(pos), {
				axis:		'x', 
				duration:	1000, 
				easing:		'easeOutQuad'
			});
		}, 7500);
	}
})();
