var ModuleListing = {
	controller: false, 

	init: function() {
		if(!$('body.admin').length) {
			this.controller = $('#module-listing input[name="controller_in_use"]').val();

			$('#module-listing').draggable({
				handle: 'h2'
			});
			$('#module-listing div').draggable({
				handle: 'h3',		
				revert: 'invalid', 
				revertDuration: 100, 
				opacity: .5
			});
			$('#module-listing form').remove();

			this.addRemoveButtonsToUsedModulesAndMakeDroppable();
		}
	}, 

	addRemoveButtonsToUsedModulesAndMakeDroppable: function() {
		// Go through list in module-listing for .in-use divs
		$('#module-listing div.in-use').each(function() {
			var modListingModule = $(this);
			var moduleName = modListingModule.find('h3').text();
			var module = $('#' +modListingModule.attr('id').replace(/^mod-/, ''));
			var remove = $('<button title="Remove module ' +moduleName +' from the page">X</button>').appendTo(module);

			module.css({position: 'relative'});
			remove.css({position: 'absolute', left: '0', top: '0'});

			// Add remove-button to all modules in use and remove the module when you click it
			remove.click(function() {
				var ajaxPostData = {
					module_listing_remove_module: 1,
					module_to_remove: moduleName, 
					controller_in_use: ModuleListing.controller
				};

				alert('Removing ' +ajaxPostData.module_to_remove +' from ' +ajaxPostData.controller_in_use);

				// Remove the in-use class from the module in the module-list so user can re-add it
				modListingModule.removeClass('in-use');

				// Remove the module-div from the page
				module.remove();

				// Ajax the change of the controller
			});

			// Make every module droppable so you can drag modules from the list in to other modules
			module.droppable({
				accept: 'div[id]:not(#module-listing)', 
				hoverClass: 'droppable-hover', 
				tolerance: 'pointer', 
				greedy: true, 
				drop: function(ev, ui) {
					var ajaxPostData = {
						module_listing_add_module: 1, 
						target: moduleName, 
						module_to_add: ui.draggable.find('h3').text(), 
						controller_in_use: ModuleListing.controller
					};

					alert('Adding ' +ajaxPostData.module_to_add +' to ' +ajaxPostData.target +' in ' +ajaxPostData.controller_in_use);

					// Hide the newly added module from the module-list
					ui.draggable.addClass('in-use');

					// Add a div for the new module
					var newMod = $('<div id="' +ui.draggable.attr('id').replace(/^mod-/, '') +'"><p>Loading ' +ajaxPostData.module_to_add +'...</p></div>').appendTo(module);

					// Now fill the div with the modules stuff
					$.get('/?module=' +ajaxPostData.module_to_add, function(data) {
						newMod.html(data);
					});

					// Ajax the change of the controller
				}
			});
		});
	}
};

ModuleListing.init();