var urlForModule = function(module) {
	return WEBROOT +'?module=' +module;
};

var aFramework = {
	run: function() {
		jQuery(document.body)
			.imageZoom()
			.maxLengthFormControls()
			.formHints()
			.captchaRefresh({
				src: urlForModule('Captcha')
			})
			.liveValidation({
				validIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-valid.png', 
				invalidIco:	WEBROOT +'aFramework/Styles/__common/gfx/jquery.liveValidation-invalid.png'
			});

		jQuery('p.code-block').codeBlockToolbar();
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

	ajaxRun: function() {
		// Now pull all the ajaxrun-modules in using XHR and then run them
		jQuery('div.ajax-run').each(function() {
			var t			= jQuery(this);
			var moduleChunks	= t.attr('id').split('-');
			var moduleName		= '';
			var niceName		= '';

			// Work out the module-name based on the ID
			for(var i in moduleChunks) {
				var firstLetter	= moduleChunks[i].substr(0, 1).toUpperCase();
				var theRest	= moduleChunks[i].substr(1);

				moduleName	+= firstLetter +theRest;
				niceName	+= firstLetter +theRest +' ';
			}

			niceName = jQuery.trim(niceName);

			t.html('Loading ' +niceName +'...');

			// Load the module with ajax
			jQuery.get(urlForModule(moduleName), function(data) {
				t.html(data);

				if(aFramework.modules[moduleName] && typeof(aFramework.modules[moduleName].run) == 'function') {
					aFramework.modules[moduleName].run();
				}
			});
		});
	}, 

	modules: []
};

jQuery(function() {
	aFramework.run();
	aFramework.runModules();
	// aFramework.ajaxRun();
});
