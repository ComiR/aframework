aFramework.modules.Search = {
	run: function() {
		jQuery('#q').liveSearch({
			ajaxURL: '/?module=SearchResults&q='
		});
	}
};