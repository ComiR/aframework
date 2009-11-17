aFramework.modules.ControllerAdmin = {
	run: function () {
		$('div.aframework-wrapper').sortable({
			sortables:	'div.aframework-module', 
			handle:		'div.aframework-module-header'
		});
	}
};
