aFramework.styles.Basic960 = {
	run: function () {
		this.fullWidthFooterAndBottom();
	}, 

	fullWidthFooterAndBottom: function () {
		$(window).load(function () {
			$('#tertiary-content, #footer').fullPageWidthBar();
		});
	}
};
