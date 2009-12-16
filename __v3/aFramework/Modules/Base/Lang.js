var Lang = {
	lang: {}, 
	get: function (str) {
		// If the string exists in the CURRENT_LANG use that
		if (typeof(this.lang[CURRENT_LANG]) != 'undefined' && typeof(this.lang[CURRENT_LANG][str]) != 'undefined') {
			return this.lang[CURRENT_LANG][str];
		}
		// Else, try default lang
		else if (typeof(this.lang[DEFAULT_LANG]) != 'undefined' && typeof(this.lang[DEFAULT_LANG][str]) != 'undefined') {
			return this.lang[DEFAULT_LANG][str];
		}
		// Else, just return the string
		else {
			return str;
		}
	}
};
