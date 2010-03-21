aFramework.modules.Sprint = {
	run: function () {
		this.createSprintTable();
		this.togglableTasks();
		this.bubbleTips();
	}, 

	bubbleTips: function () {
		$('#sprint div.sprint-table li a').each(function (i) {
			var link	= $(this).attr('id', 'jquery-bubble-tip-mandatory-id-' + i);
			var content	= '<div id="jquery-bubble-tip-mandatory-id-2-' + i + '" class="sprint-day-bubble">' + $('#sprint > ol > li').eq(link.attr('href').substr(1) - 1).html() + '</div>';

			link.bubbletip(content);
		});
	}, 

	togglableTasks: function () {
		var tasks = $('#sprint > ul').hide();

		$('<a href="#" class="tasks-toggler">' + Lang.get('Toggle Tasks') + '</a>').insertAfter('#sprint div.sprint-table').click(function () {
			tasks.toggle();

			if (tasks.is(':visible')) {
				$(window).scrollTo(tasks);
			}

			return false;
		});
	}, 

	createSprintTable: function () {
		var sprintDays	= $('#sprint > ol');
		var sprintTable	= $('<div class="sprint-table"><ol></ol></div>').insertBefore(sprintDays).find('ol');

		sprintDays.find('> li').each(function (i) {
			var dayNum	= i + 1;
			var thisDay	= $(this);
			var newDay	= $('<li></li>').appendTo(sprintTable);

			if (thisDay.find('strong').length) {
				newDay.append('<strong>' + Lang.get("This day hasn't happened yet.") + '</strong>').addClass('not-happened');
			}
			else {
				var percent = parseInt(thisDay.find('p').text(), 10);

				newDay
					.append('<a href="#' + dayNum + '">' + Lang.get('NUM% on day NUM', [percent, dayNum]) + '</a>')
					.find('a')
						.css('margin-bottom', Math.round(percent * 2 + 10) + 'px')
						.click(function () {return false;});
			}

			newDay.append(Lang.get('Day NUM', [dayNum]));
		});
	}
};
