/*
DarkerStyle = {
	run: function() {
		$('#header a').html('Andreas<br />Lagerkvist.com');
	}
};

DarkerStyle.run();
*/

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