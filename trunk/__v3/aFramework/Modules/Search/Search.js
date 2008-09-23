aFramework.modules.Search = {
	run: function() {
		jQuery('#q').liveSearch({
			ajaxURL: WEBROOT +'?module=SearchResults&q='
		});
	}
};