var Router = {
	urlForModule: function (module) {
		var langPrefix = '';

		if (CURRENT_LANG != DEFAULT_LANG) {
			langPrefix = CURRENT_LANG + '/';
		}

		return WEBROOT + langPrefix + '?module=' + module;
	}
};
