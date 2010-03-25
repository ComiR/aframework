aFramework.modules.Sprint = {
	run: function () {
		this.createSprintTable();
		this.togglableTasks();
		this.bubbleTips();
		this.onlyShowSiteNameOnce();
	}, 

	onlyShowSiteNameOnce: function () {
		var tasks = $('#sprint > ul li');

		tasks.each(function (i) {
			var site		= $(this).find('a').eq(0).text();
			var prevSite	= tasks.eq(i - 1).find('a').eq(0).text();

			if (i > 0 && prevSite == site) {
				$(this).addClass('repeated-site');
			}
		});
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

		var checkbox = $('<p><label><input type="checkbox"/>' + Lang.get('Show unfinished tasks in this sprint') + ' (' + tasks.find('> li').length + ')</label></p>')
			.insertAfter('#sprint div.sprint-table')
			.find('input');

		var toggleTasks = function () {
			if (checkbox.is(':checked')) {
				tasks.show();
				$(window).scrollTo(tasks);
			}
			else {
				tasks.hide();
			}
		};

		toggleTasks();
		checkbox.click(toggleTasks);
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
					.append('<a href="#' + dayNum + '">' + percent + '%</a>')
					.find('a')
						.css('margin-bottom', Math.round(percent * 2.7 + 5) + 'px')
						.click(function () {return false;});
			}

			newDay.append('<span>' + Lang.get('Day NUM', [dayNum]) + '</span>');
		});
	}
};
