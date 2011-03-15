aFramework.styles.BoxyOLE = {
	run: function () {
		$('#header').fullPageWidthBar();

		aFramework.styles.BaseOLE.onWindowOnload.push(function () {
			$('#primary-content, #secondary-content').equalHeight();
		});
	}
};
