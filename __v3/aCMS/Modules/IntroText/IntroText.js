aFramework.modules.IntroText = {
	run: function () {
		this.initMarkItUp();
	}, 

	initMarkItUp: function () {
		$('#intro-text textarea[name=content]').markItUp(mySettings);
	}
};
