(function () {
	if (document.getElementById('site-reviews')) {
		$('<div id="review-tabs"><ul><li><a href="#site-reviews">' + Lang.get('Read Reviews') + '</a></li><li><a href="#post-site-review">' + Lang.get('Write a Review') + '</a></li></ul></div>').insertAfter('#site').superSimpleTabs();
	}
})();
