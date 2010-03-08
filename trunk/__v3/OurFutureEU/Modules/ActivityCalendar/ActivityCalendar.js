aFramework.modules.ActivityCalendar = {
	run: function () {
		this.hijaxPrevNextLinks();
		this.highlightToday();
		this.hijaxDayLinks();
	}, 

	hijaxDayLinks: function () {
		var activityCalendar	= $('#activity-calendar');
		var calendarTable		= activityCalendar.find('table');
		var calendarTableDim	= calendarTable.offset();
			calendarTableDim	= {
			left:	calendarTableDim.left, 
			top:	calendarTableDim.top, 
			width:	calendarTable.width(), 
			height:	calendarTable.height()
		};
		var activitiesBox		= $('<div id="activities"/>')
									.appendTo(document.body)
									.css({
										width:	calendarTableDim.width + 'px', 
										height:	calendarTableDim.height + 'px', 
										left:	calendarTableDim.left + 'px', 
										top:	calendarTableDim.top + 'px'
									})
									.slideUp(0);

		// When clicking day - ajax in activities and slide down box
		$('#activity-calendar td a').click(function () {
			$.get($(this).attr('href'), function (data) {
				activitiesBox
					.html(data)
					.slideDown(200)
					.append('<a href="#" class="close">' + Lang.get('Close') + '</a>')
						.find('a.close').click(function () {
							calendarTableDim.height = calendarTable.height();

							activitiesBox
								.css({
									width:	calendarTableDim.width + 'px', 
									height:	calendarTableDim.height + 'px', 
									left:	calendarTableDim.left + 'px', 
									top:	calendarTableDim.top + 'px'
								})
								.slideUp(200);

							return false;
						});
			});

			return false;
		});

		// Create close link and close box onclick
	}, 

	highlightToday: function () {
		var date		= new Date();
		var monthYear	= $('#activity-calendar h2').text(); // date.getMonth() + ' ' + date.getYear();
		var day			= date.getDate();

		if ($('#activity-calendar h2').text() == monthYear) {
			$('#activity-calendar td').filter(function () {
				return parseInt($(this).text(), 10) == day;
			}).wrapInner('<strong/>');
		}
	}, 

	hijaxPrevNextLinks: function () {
		jQuery('#activity-calendar ul a').click(function () {
			var clicked = jQuery(this);
			var oldText = clicked.text();
			var year	= clicked.attr('href').substr(1, 4);
			var month	= clicked.attr('href').substr(6, 2);
			var url		= Router.urlForModule('ActivityCalendar') + '&year=' + year + '&month=' + month;

			clicked.text(Lang.get('Loading') + '...');

			jQuery.get(url, function (data) {
				if (data == '') {
					clicked.parent().html(oldText);
				}
				else {
					jQuery('#activity-calendar').html(data);
					aFramework.modules.ActivityCalendar.run();
				}
			});

			return false;
		});
	}
};
