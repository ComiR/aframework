aFramework.modules.Tasks = {
	run: function () {
		this.togglableDones();
		this.clickableTRs();
	}, 

	clickableTRs: function () {
		$('#tasks tr').click(function () {
			var link = $(this).find('a');

			if (link.length) {
				window.location = link.attr('href');
			}
		});
	}, 

	togglableDones: function () {
		var tableNoFinished		= $('#tasks table');
		var tableWithFinished	= tableNoFinished.clone().insertAfter(tableNoFinished).hide();

		tableNoFinished.find('tr.done').remove();

		$('<p><label><input type="checkbox" checked="checked"/> ' + Lang.get('Hide finished tasks') + '</label></p>')
			.insertAfter('#tasks h2 + p')
			.find('input')
				.click(function () {
					if ($(this).is(':checked')) {
						tableNoFinished.show();
						tableWithFinished.hide();
					}
					else {
						tableWithFinished.show();
						tableNoFinished.hide();
					}
				});
	}
};
