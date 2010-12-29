WM.modules.TwitterFeed = {
	init: function () {
		this.insertLatestFeed();
	}, 

	insertLatestFeed: function () {
		var username	= 'workmint';
		var limit		= 3;
		var url			= 'http://twitter.com/statuses/user_timeline.json?screen_name=' + username + '&count=' + limit + '&callback=?';

		$.getJSON(url, function (data) {
			var html = '<div class="feeds"><ul>';

			for (var i in data) {
				html += '<li><a href="http://twitter.com/' + username + '#status_' + data[i].id_str + '">' + data[i].text + '</a> <i>' + WM.modules.TwitterFeed.daysAgo(data[i].created_at) + '</i></li>'
			}

			html += '</ul></div>';

			$('#twitter-feed p').replaceWith(html);

			WM.modules.TwitterFeed.scrollFeeds();
		});
	}, 

	scrollFeeds: function () {
		var feedContainer	= $('#twitter-feed div.feeds');
		var feedList		= feedContainer.find('ul');
		var feedHTML		= feedList.html();
		var numFeeds		= feedList.find('li').length;

		feedList.html(feedHTML + feedHTML);

		var scrollFeeds = function () {
			feedContainer.scrollTo(0).scrollTo('li:eq(' + numFeeds + ')', {
				axis:		'x', 
				easing:		'linear',
				duration:	80000, 
				onAfter:	function () {
					scrollFeeds();
				}
			});
		};

		setTimeout(function () {
			scrollFeeds();
		}, 2000);
	}, 

	daysAgo: function (date) {
		// TODO: Fix date for IE
		if ($.browser.msie) {
			return '1 day ago';
		}

		var d = new Date(date).getTime();
		var n = new Date().getTime();

		var numDays = Math.round(Math.abs(n - d) / (1000 * 60 * 60 * 24));
		var daysAgo = numDays + ' days ago';

		if (numDays == 0) {
			daysAgo = 'today';
		}
		else if (numDays == 1) {
			daysAgo = numDays + ' day ago';
		}

		return daysAgo;
	}
};
