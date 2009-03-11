var Lang = {
	lang: {}, 
	get: function ( str ) {
		return typeof(this.lang[str]) != 'undefined' ? this.lang[str] : '[' + str + ']';
	}
};