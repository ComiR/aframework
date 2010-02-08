aFramework.modules.PostSiteReview = {
	run: function () {
		this.initMarkItUp();
	}, 

	initMarkItUp: function () {
		$('#post-site-review textarea[name=content]').markItUp(mySettings);
	}
};
