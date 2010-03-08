aFramework.styles.OpenOLE = {
	run: function () {
		this.fullWidthBottom();
		this.movingSun();
	}, 

	fullWidthBottom: function () {
		$('#tertiary-content, #footer').fullPageWidthBar();
	}, 

	movingSun: function () {
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
	}
};
