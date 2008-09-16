var aFramework = {
	run: function() {
	//	$.imgzoom();
	//	$.codeBlocks();
	//	$.maxLengthInputs();
		$.formHints();
	//	$.captchaRefresh('/captha.png');
	}, 

	runModules: function() {
		// Run through all modules
		for(var module in aFrameWork.modules) {
			// Work out the HTML-ID based on the module-name (RecentArticles == recent-articles)
			var id = module.replace(/([A-Z])/g, '-$1').toLowerCase();

			if(id.substring(0, 1) == '-') {
				id = id.substring(1);
			}

			// Ajax-run-modules are run after they are fetched
			if(!$('#' +id).is('.ajax-run')) {
				if(typeof(aFrameWork.modules[module].run) == 'function') {
					aFrameWork.modules[module].run();
				}
			}
		}
	}, 

	ajaxRun: function() {
		// Now pull all the ajaxrun-modules in using XHR and then run them
		$('div.ajax-run').each(function() {
			var t = $(this);
			var moduleChunks = t.attr('id').split('-');
			var moduleName = '';
			var niceName = '';

			// Work out the module-name based on the ID
			for(var i in moduleChunks) {
				var firstLetter = moduleChunks[i].substr(0, 1).toUpperCase();
				var theRest = moduleChunks[i].substr(1);
				moduleName += firstLetter +theRest;
				niceName += firstLetter +theRest +' ';
			}

			niceName = $.trim(niceName);

			$(this).html('Loading ' +niceName +'...');

			// Load the module with ajax
			$.get('/?module=' +moduleName +'/', function(data) {
				t.html(data);
				if(aFrameWork.modules[moduleName] && typeof(aFrameWork.modules[moduleName].run) == 'function') {
					aFrameWork.modules[moduleName].run();
				}
			});
		});
	}, 

	modules: []
};

$(function() {
	aFramework.run();
	// aFramework.runModules();
	// aFramework.ajaxRun();
});