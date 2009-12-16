aFramework.modules.Search = {
	run: function () {
		jQuery('#q').liveSearch({
			url: Router.urlForModule('SearchResults') + '&q='
		});
	}
};
