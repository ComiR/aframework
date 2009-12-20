var aFramework = {
	run: function() {
		jQuery(document.body)
			.imageZoom()
			.maxLengthFormControls()
			.formHints()
			.liveValidation({
				validIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-valid.png', 
				invalidIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-invalid.png'
			});
	}, 

	runModules: function() {
		// Run through all modules
		for(var module in aFramework.modules) {
			// Work out the HTML-ID based on the module-name (RecentArticles == recent-articles)
			var id = module.replace(/([A-Z])/g, '-$1').toLowerCase();

			id = id.substring(0, 1) == '-' ? id.substring(1) : id;

			// Only run modules that are used and don't run ajax-run-modules
			if(jQuery('#' +id).length && !jQuery('#' +id).is('.ajax-run') && typeof(aFramework.modules[module].run) == 'function') {
				aFramework.modules[module].run();
			}
		}
	}, 

	modules: []
};

jQuery(function() {
	aFramework.run();
	aFramework.runModules();
});
