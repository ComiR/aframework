aFramework.modules.ControllerAdmin = {
	run: function () {
		// Make every module in every wrapper sortable
		$('div.aframework-wrapper').sortable({
			sortables:			'div.aframework-module', 
			handle:				'div.aframework-module-header', 
			connectWith:		'div.aframework-wrapper'
		});

		// Make every module in the controller-admin panel draggable
		$('#controller-admin li').draggable({
			appendTo:			document.body, 
			connectToSortable:	'div.aframework-wrapper', 
			helper:				function (ev, ui) {
				var moduleID	= '';
				var moduleTitle	= 'aModule';

				return $('<div class="aframework-module" id="' + moduleID + '"><div class="aframework-module-header">' + moduleTitle + ' <a href="?remove_module=' + moduleTitle + '">Remove</a></div>')[0];
			}
		});
	}
};
