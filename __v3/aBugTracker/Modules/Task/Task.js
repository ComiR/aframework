aFramework.modules.Task = {
	run: function () {
		this.initMarkItUp();
	}, 

	initMarkItUp: function () {
		$('#task textarea[name=content]').markItUp(mySettings);
	}
};
