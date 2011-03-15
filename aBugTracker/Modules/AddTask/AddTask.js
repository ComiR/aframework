aFramework.modules.AddTask = {
	run: function () {
		this.initMarkItUp();
	}, 

	initMarkItUp: function () {
		$('#add-task textarea[name=content]').markItUp(mySettings);
	}
};
