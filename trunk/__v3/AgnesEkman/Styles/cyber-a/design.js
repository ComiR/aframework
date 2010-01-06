(function () {
	// Add some design-related spans to the navigation
	$('#navigation')
		.append('<span/>')
		.find('a')
			.append('<span/>');

	// Fix the gallery page
	$('#gallery h3').equalHeight();

	// Add pins
	$('#secondary-content').append('<div class="first-pin"/><div class="second-pin"/>');

	// Make sure primary-content is as tall as secondary-content
	window.addEventListener('load', function () {
		$('#primary-content').css('min-height', $('#secondary-content').height() + 'px');
	}, false);
})();

aFramework.modules.PostComment.initMarkItUp = function () {};