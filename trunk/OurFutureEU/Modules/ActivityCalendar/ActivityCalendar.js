aFramework.modules.ActivityCalendar = {
	run: function () {
		this.hijaxPrevNextLinks();
		this.highlightToday();
		this.hijaxDayLinks();
		this.initMarkItUp();

		// For styling
		$('#activity-calendar td a:has(small)').addClass('insert');
	}, 

	initMarkItUp: function () {
	//	$('#activity-calendar textarea[name=content]').markItUp(mySettings);
	}, 

	hijaxDayLinks: function () {
		var activityCalendar	= $('#activity-calendar');
		var calendarTable		= activityCalendar.find('table');
		var activitiesBox		= $('#activities');

		if (!activitiesBox.length) {
			activitiesBox = $('<div id="activities"/>').appendTo(document.body).fadeOut(0);
		}

		$(document.body).click(function (e) {
			var clicked = $(e.target);

			if (!(clicked.is('#activities') || clicked.parents('#activities').length)) {
				activitiesBox.fadeOut(200);
			}
		});

		// When clicking day - ajax in activities and slide down box
		$('#activity-calendar td a').click(function () {
			var clicked			= $(this);
			var clickedOffset	= clicked.offset();

			$.get(clicked.attr('href'), function (data) {
				activitiesBox
					.html(data)
					.css({
						left:		(clickedOffset.left - activitiesBox.width()) + 'px', 
						top:		(clickedOffset.top - activitiesBox.height()) + 'px'
					})
					.fadeIn(200);

				aFramework.modules.Activities.run();
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
