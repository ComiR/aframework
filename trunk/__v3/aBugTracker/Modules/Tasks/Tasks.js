aFramework.modules.Tasks = {
	run: function () {
		this.togglableDones();
	}, 

	togglableDones: function () {
		var finishedTasks = $('#tasks tr.done').hide();

		$('<p><label><input type="checkbox" checked="checked"/> ' + Lang.get('Hide finished tasks') + '</label></p>')
			.insertAfter('#tasks h2')
			.find(':checkbox')
				.click(function () {
					finishedTasks.toggle();
				});
	}
};
