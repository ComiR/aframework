aFramework.modules.Tasks = {
	run: function () {
		this.togglableDones();
		this.clickableTRs();
		this.togglableAllTasks();
	}, 

	togglableAllTasks: function () {
		$('#tasks table').each(function () {
			var show		= 5;
			var table		= $(this);
			var trs			= table.find('tr');
			var numTasks	= trs.length - 1;
			var numDone		= trs.filter('.done').length;

			if (numTasks > show) {
				table.find('tr').each(function (i) {
					if (i > show) {
						$(this).addClass('hidden');
					}
				});

				$('<p><label><input type="checkbox"/> ' + Lang.get('Show all tasks') + ' (' + numTasks + ')</label></p>')
					.insertAfter(table)
					.find('input')
						.click(function () {
							if ($(this).is(':checked')) {
								$('#tasks').addClass('show-all');
							//	$('#tasks :checkbox[name=hide_done]').attr('checked', false).click().attr('checked', false);
							}
							else {
								$('#tasks').removeClass('show-all');
							}
						});
			}
		});
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
		var numFinishedTasks = $('#tasks tr.done').length;

		if (numFinishedTasks) {
			$('<p><label><input type="checkbox" name="hide_done"/> ' + Lang.get('Hide finished tasks') + ' (' + numFinishedTasks + ')</label></p>')
				.insertAfter('#tasks h2 + p')
				.find('input')
					.click(function () {
						if ($(this).is(':checked')) {
							$('#tasks').addClass('hide-done');
						}
						else {
							$('#tasks').removeClass('hide-done');
						}
					});
		}
	}
};
