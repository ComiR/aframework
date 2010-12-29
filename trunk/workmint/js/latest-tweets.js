WM.modules.LatestTweets = {
	init: function () {
		this.insertLatestFeed();
	}, 

	insertLatestFeed: function () {
		var username	= 'workmint';
		var limit		= 5;
		var url			= 'http://twitter.com/statuses/user_timeline.json?screen_name=' + username + '&count=' + limit + '&callback=?';

		$.getJSON(url, function (data) {
			var html = '<ul>';

			for (var i in data) {
				html += '<li><a href="http://twitter.com/' + username + '#status_' + data[i].id_str + '" title="' + data[i].text + '">' + data[i].text.substr(0, 22) + '... <i>' + WM.modules.TwitterFeed.daysAgo(data[i].created_at) + '</i></a></li>'
			}

			html += '</ul>';

			$('#latest-tweets p').replaceWith(html);

			WM.modules.Wrapper.insertBottomArrows('#latest-tweets ul a');
			$('#latest-tweets li:last-child').addClass('last-child');
		});
	}
};
