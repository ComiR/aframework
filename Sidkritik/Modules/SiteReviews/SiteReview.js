aFramework.modules.SiteReviews = {
	run: function () {
		this.hijaxThumbsUpDown();
	}, 

	hijaxThumbsUpDown: function () {
		$('#site-reviews > ol > li').each(function () {
			var review			= $(this);
			var thumbsUpDown	= review.find('ul:eq(0) > li');
			var thumbsUp		= thumbsUpDown.eq(0);
			var thumbsDown		= thumbsUpDown.eq(1);
			var thumbsUpTxt		= thumbsUp.find('input[type=submit]').val();
			var thumbsDownTxt	= thumbsDown.find('input[type=submit]').val();
			var thumbsUpNum		= parseInt(thumbsUp.text(), 10);
			var thumbsDownNum	= parseInt(thumbsDown.text(), 10);
			var siteReviewsID	= review.find('input[name=site_reviews_id]').val();
			var hasVoted		= false;

			thumbsUp.html('<a href="#">' + thumbsUpTxt + '</a> (<span>' + thumbsUpNum + '</span>)').find('a').click(function () {
				if (!hasVoted) {
					$.post(Router.urlForModule('SiteReviews'), {
						site_reviews_thumbs_up_submit:		1, 
						site_reviews_id:					siteReviewsID
					});

					thumbsUp.find('span').text(parseInt(thumbsUp.find('span').text(), 10) + 1);
				}

				hasVoted = true;

				return false;
			});

			thumbsDown.html('<a href="#">' + thumbsDownTxt + '</a> (<span>' + thumbsDownNum + '</span>)').find('a').click(function () {
				if (!hasVoted) {
					$.post(Router.urlForModule('SiteReviews'), {
						site_reviews_thumbs_down_submit:	1, 
						site_reviews_id:					siteReviewsID
					});

					thumbsDown.find('span').text(parseInt(thumbsDown.find('span').text(), 10) + 1);
				}

				hasVoted = true;

				return false;
			});
		});
	}
};
