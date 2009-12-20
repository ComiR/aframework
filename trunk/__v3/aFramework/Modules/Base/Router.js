var Router = {
	urlForModule: function (module) {
		var langPrefix = '';

		if (CURRENT_LANG != DEFAULT_LANG) {
			langPrefix = CURRENT_LANG + '/';
		}

		return WEBROOT + langPrefix + '?module=' + module;
	},

	urlForUtil: function (util) {
		return WEBROOT + 'aFramework/Utils/' + util + '.php';
	},

	urlize: function (str) {
		return str.toLowerCase().replace(/ö/g, 'o').replace(/å|ä/g, 'a').replace(/å|ä/g, 'a').replace(/ /g, '-').replace(/[^a-z0-9_-]/g, '').replace(/[-]+/g, '-');
	}
};
