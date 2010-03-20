Lang.get = function (str, vars) {
	// If the string exists in the CURRENT_LANG use that
	if (typeof(this.lang[CURRENT_LANG]) != 'undefined' && typeof(this.lang[CURRENT_LANG][str]) != 'undefined') {
		str = this.lang[CURRENT_LANG][str];
	}
	// Else, try default lang
	else if (typeof(this.lang[DEFAULT_LANG]) != 'undefined' && typeof(this.lang[DEFAULT_LANG][str]) != 'undefined') {
		str = this.lang[DEFAULT_LANG][str];
	}
	// Else, just return the string

	// Replace vars
	if (typeof(vars) == 'object') {
		for (var i in vars) {
		//	console.log('Replacing "', '%' + i, '" with "', vars[i], '" in "', str, '"');
			str = str.replace('%' + i, vars[i]);
		}
	}

	return str;
};
