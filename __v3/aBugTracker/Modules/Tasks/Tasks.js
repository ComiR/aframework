aFramework.modules.Tasks = {
	run: function () {
		this.togglableDones();
		this.clickableTRs();
		this.togglableAllTasks();
		this.sortableTasks();
	}, 

	sortableTasks: function () {
		$('#tasks table').tablesorter({sortList: [[3, 1]]});
	}, 

	togglableAllTasks: function () {
		$('#tasks table').each(function () {
			var tasks		= $('#tasks').addClass('show-all');
			var show		= 5;
			var table		= $(this);
			var trs			= table.find('tbody tr');
			var numTasks	= trs.length;
			var numDone		= trs.filter('.done').length;

			if (numTasks > show) {
				$('<p><label><input type="checkbox" checked="checked"/> ' + Lang.get('Show all tasks') + ' (' + numTasks + ')</label></p>')
					.insertAfter(table)
					.find('input')
						.click(function () {
							if ($(this).is(':checked')) {
								tasks.addClass('show-all');
							//	$('#tasks :checkbox[name=hide_done]').attr('checked', false).click().attr('checked', false);
							}
							else {
								tasks.removeClass('show-all');
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
		var tasks = $('#tasks').addClass('hide-done');

		if (numFinishedTasks) {
			$('<p><label><input type="checkbox" name="hide_done" checked="checked"/> ' + Lang.get('Hide finished tasks') + ' (' + numFinishedTasks + ')</label></p>')
				.insertAfter('#tasks h2 + p')
				.find('input')
					.click(function () {
						if ($(this).is(':checked')) {
							tasks.addClass('hide-done');
						}
						else {
							tasks.removeClass('hide-done');
						}
					});
		}
	}
};
