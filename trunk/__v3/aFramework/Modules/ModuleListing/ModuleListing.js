var ModuleListing = {
	init: function() {
		// Only run if admin
		if(!$('body.admin').length) {
			this.makeModulesDraggable();
			this.addRemoveButtonsToUsedModulesAndMakeDroppable();
		}
	}, 

	// Makes modules in module-listing, as well as module-listing itself, draggable
	makeModulesDraggable: function() {
		$('#module-listing').draggable({
			handle:			'h2'
		});

		$('#module-listing div').draggable({
			handle:			'h3',		
			revert:			'invalid', 
			revertDuration:	100, 
			opacity:		.5
		});
	}, 

	// Adds a [remove]-button to every module currently in use on the page
	// Also make them "droppable"
	addRemoveButtonsToUsedModulesAndMakeDroppable: function() {
		// Add remove-button to all modules in use and remove the module when you click it
		var addRemoveButton = function(module, moduleName, controllerInUse) {
			var info	= 'Remove module ' +moduleName +' from controller ' +controllerInUse;
			var remove	= $('<button title="' +info +'">X</button>').appendTo(module);

			// When you click the remove-button
			remove.click(function() {
				// Remove the in-use class from the module in the module-list so user can re-add it
				$('#mod-' +module.attr('id')).removeClass('in-use');

				// See if module contained any children (look for remove-buttons), if so re-add them to list as-well
				module.find('div button[title^="Remove module "]').each(function() {
					$('#mod-' +$(this).parents('div').eq(0).attr('id')).removeClass('in-use');
				});

				// Remove the module-div from the page
				module.remove();

				// Ajax the change of the controller
				$.post('/?module=ModuleListing', {
					module_listing_remove_module:	1,
					module_to_remove:				moduleName, 
					controller_in_use:				controllerInUse
				});
			});
		};

		// Make every module droppable so you can drag modules from the list into other modules
		var makeDroppable = function(module, moduleName, controllerInUse) {
			var beforeClass = 'module-listing-insert-module-before';
			var appendClass = 'module-listing-append-module-to';

			module.droppable({
				accept:		'div[id]:not(#module-listing)', 
				tolerance:	'intersect', 
				greedy:		true, 
				// When a module is dragged over another
				mouseover: function(ev, ui) {
					// Remove any existing markers
					$('.' +beforeClass).removeClass(beforeClass);
					$('.' +appendClass).removeClass(appendClass);

					// Get the position of the module
					var targetOffset = ui.element.offset();

					// If the module being dragged is above the module
					if(ui.absolutePosition.top < targetOffset.top) {
						module.addClass(beforeClass);
					}
					// It's inside
					else {
						module.addClass(appendClass);
					}
				}, 
				// When dragging out
				mouseout: function() {
					// Remove any existing markers
					$('.' +beforeClass).removeClass(beforeClass);
					$('.' +appendClass).removeClass(appendClass);
				}, 
				// When dropping module
				drop: function(ev, ui) {
					var moduleToAdd		= ui.draggable.find('h3').text();
					var moduleToAddID	= ui.draggable.attr('id').replace(/^mod-/, '');
					var info			= 'Add ' +moduleToAdd +' to ' +moduleName +' in ' +controllerInUse;

					// Ajax the change of the controller
					var ajaxPostData = {
						module_listing_add_module:	1, 
						add_type:					$('.' +beforeClass).length ? 'before' : 'append', 
						target:						moduleName, 
						module_to_add:				moduleToAdd, 
						controller_in_use:			controllerInUse
					};

					// Remove any existing markers
					$('.' +beforeClass).removeClass(beforeClass);
					$('.' +appendClass).removeClass(appendClass);

					// Hide the newly added module from the module-list
					ui.draggable.addClass('in-use').css({left: 0, top: 0});

					// Use the ghost-div for the new module
					var newMod = $('<div id="' +moduleToAddID +'"><p>Loading...</p></div>');

					if(ajaxPostData.add_type == 'before') {
						newMod.insertBefore(module);
					}
					else {
						newMod.appendTo(module);
					}

					// Now fill the div with the module's stuff
					$.get('/?module=' +moduleToAdd, function(data) {
						newMod.html(data).addClass('module-listing-used-module');

						if(aFramework.modules[ajaxPostData.module_to_add] && typeof(aFramework.modules[ajaxPostData.module_to_add].run) == 'function') {
							aFramework.modules[ajaxPostData.module_to_add].run();
						}

						addRemoveButton(newMod, moduleToAdd, controllerInUse);
						makeDroppable(newMod, moduleToAdd, controllerInUse);
					});

					$.post('/?module=ModuleListing', ajaxPostData);
				}
			});
		};

		// We need to know the name of the controller for the ajax-calls
		var controllerInUse = $('#module-listing input[name="controller_in_use"]').val();

		// Go through every module that is used in this controller
		$('#module-listing select[name="target"]').eq(0).find('option').each(function() {
			var moduleID	= $(this).attr('class');
			var module		= moduleID == 'base' ? $(document.body) : $('#' +moduleID);
			var moduleName	= $(this).val();

			if(moduleName != 'Base' && moduleName.indexOf('Wrapper:') === -1) {
				addRemoveButton(module, moduleName, controllerInUse);
			}
			if(moduleName != 'Base') { // tmp...
				makeDroppable(module, moduleName, controllerInUse);
				module.addClass('module-listing-used-module');
			}
		});

		$('#module-listing form').remove();
	}
};

ModuleListing.init();