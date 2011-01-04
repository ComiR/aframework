var WM = {
	init: function() {
	//	this.initJavaSession();
		this.initModules();

		$(document.body).staticToDynamicGM();
	//	$(document.body).imageZoom();

		// Fix IE6 background flicker
		try {
			document.execCommand("BackgroundImageCache", false, true);
		}
		catch (err) {
		}
	}, 

	initJavaSession: function () {
		$.ajax('/Error');
	}, 

	initModules: function() {
		// Run through all modules
		for (var module in this.modules) {
			// Work out the HTML-ID based on the module-name (RecentArticles == recent-articles)
			var id = module.replace(/([A-Z])/g, '-$1').toLowerCase();

			id = id.substring(0, 1) == '-' ? id.substring(1) : id;

			var mod = jQuery('#' + id);

			// Only run modules that are used and don't run ajax-run-modules
			if (mod.length && typeof(this.modules[module].init) == 'function') {
				this.modules[module].init(mod);
			}
		}
	}, 

	modules: []
};

jQuery(function() {
	WM.init();
});
