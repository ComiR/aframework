aFramework.modules.Search = {
	run: function () {
		jQuery('#q').liveSearch({
			url: WEBROOT + '?module=SearchResults&q='
		});
	}
};