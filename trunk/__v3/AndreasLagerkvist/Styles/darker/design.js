DarkerStyle = {
	run: function () {
		this.collapsableArticleByDateMonths();
	//	this.postCommentHints();
	}, 

	postCommentHints: function () {
		jQuery('#post-comment label').each(function () {
			jQuery(this).find('input').val(jQuery(this).text()).end().text('');
		});
	}, 

	collapsableArticleByDateMonths: function () {
		jQuery('#articles-by-date h3').each(function () {
			var t	= jQuery(this);
			var a	= t.find('a');
			var ul	= t.nextAll('ul').eq(0).slideUp(0);

			a.click(function () {
				ul.slideToggle(500);
				return false;
			});
		});
	}
};

DarkerStyle.run();

/* We want some animation in search so we have to override the original search-module
aFramework.modules.Search = {
	run: function() {
		$('#q')
			.focus(function() {
				$(this).animate({
					width: '290px'
				}, 300);
			})
			.blur(function() {
				if(!$('#jquery-live-search').is(':visible')) {
					$(this).animate({
						width: '145px'
					}, 300);
				}
			})
			.liveSearch({
				url:		WEBROOT +'?module=SearchResults&q=', 
				duration:	300, 
				onSlideUp:	function() {
					$('#q').blur();
				}
			}
		);
	}
}; */