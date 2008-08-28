var ModuleListing = {
	init: function() {
		if(!$('body.admin').length) {
			this.makeModulesDraggable();
			this.addRemoveButtonsToUsedModulesAndMakeDroppable();
		}
	}, 

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

	addRemoveButtonsToUsedModulesAndMakeDroppable: function() {
		// Add remove-button to all modules in use and remove the module when you click it
		var addRemoveButton = function(module, moduleName, controllerInUse) {
			var remove = $('<button title="Remove module ' +moduleName +' from controller ' +controllerInUse +'">X</button>').appendTo(module);

			module.css({position: 'relative'});
			remove.css({position: 'absolute', left: '0', top: '0'});

			remove.click(function() {
				var ajaxPostData = {
					module_listing_remove_module:	1,
					module_to_remove:				moduleName, 
					controller_in_use:				controllerInUse
				};

			//	alert('Removing ' +ajaxPostData.module_to_remove +' from ' +ajaxPostData.controller_in_use);

				// Remove the in-use class from the module in the module-list so user can re-add it
				$('#mod-' +module.attr('id')).removeClass('in-use');

				// See if module contained any children (look for remove-buttons), if so re-add them to list as-well
				module.find('div button[title^="Remove module "]').each(function() {
					$('#mod-' +$(this).parents('div').attr('id')).removeClass('in-use');
				});

				// Remove the module-div from the page
				module.remove();

				// Ajax the change of the controller
			});
		};

		// Make every module droppable so you can drag modules from the list in to other modules
		var makeDroppable = function(module, moduleName, controllerInUse) {
			module.droppable({
				accept:		'div[id]:not(#module-listing)', 
				hoverClass:	'droppable-hover', 
				tolerance:	'intersect', 
				greedy:		true, 
				// When a module is dragged over another
				mouseover: function(ev, ui) {
					// Remove any existing ghost-module
					$('div.module-listing-ghost-module').remove();

					// Get the position of the module
					var targetOffset = ui.element.offset();
					var ghostMod = '<div class="module-listing-ghost-module"><h2>' +ui.draggable.find('h3').text() +'</h2></div>';

					// If the module being dragged is above the module
					if(ui.absolutePosition.top < targetOffset.top) {
						ghostMod = $(ghostMod).insertBefore(module);
						ghostMod.parent().addClass('droppable-over');
					}
					// If it's beneath
					else if(false) {
						ghostMod = $(ghostMod).insertAfter(module);
					}
					// It's inside
					else {
						ghostMod = $(ghostMod).appendTo(module);
						module.addClass('droppable-over');
					}
				}, 
				// When dragging out
				mouseout: function() {
					$('div.module-listing-ghost-module').remove();
					$('.droppable-over').removeClass('droppable-over');
				}, 
				// When dropping module
				drop: function(ev, ui) {
					var ajaxPostData = {
						module_listing_add_module:	1, 
						target:						moduleName, 
						module_to_add:				ui.draggable.find('h3').text(), 
						controller_in_use:			controllerInUse
					};

				//	alert('Adding ' +ajaxPostData.module_to_add +' to ' +ajaxPostData.target +' in ' +ajaxPostData.controller_in_use);

					$('.droppable-over').removeClass('droppable-over');

					// Hide the newly added module from the module-list
					ui.draggable.addClass('in-use').css({left: 0, top: 0});

					// Use the ghost-div for the new module
					var newMod = $('div.module-listing-ghost-module').attr('id', ui.draggable.attr('id').replace(/^mod-/, '')).append('<p>Loading...</p>');

					// Now fill the div with the module's stuff
					$.get('/?module=' +ajaxPostData.module_to_add, function(data) {
						newMod.html(data).removeClass('module-listing-ghost-module').addClass('module-listing-used-module');
/*
						if(typeof(aFramework.modules[ajaxPostData.module_to_add].run) == 'function') {
							aFramework.modules[ajaxPostData.module_to_add].run();
						}
*/
						addRemoveButton(newMod, ajaxPostData.module_to_add, controllerInUse);
						makeDroppable(newMod, ajaxPostData.module_to_add, controllerInUse);
					});

					// Ajax the change of the controller
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