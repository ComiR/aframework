var ModuleListing = {
	controller: false, 

	init: function() {
		this.controller = $('#module-listing input[name="used_controller"]').val();

		$('#module-listing > p + p').html('Simply click the [Remove]-button next to a module in use to remove it and place it back in the list, or drag modules from the list to the page to add them.');
		$('#module-listing').draggable({handle: 'h2'});
		$('#module-listing div').draggable({handle: 'h3'});

		this.removeFormsAndUsedModules();
		this.addRemoveButtonsToUsedModules();
	}, 

	removeFormsAndUsedModules: function() {
		$('#module-listing form').remove();
		$('#module-listing div.in-use').hide();
	}, 

	addRemoveButtonsToUsedModules: function() {
		// Go through list in module-listing for .in-use divs
		$('#module-listing div.in-use').each(function() {
			// They have the same ID as the actual modules prepended with mod-
			var modID = $(this).attr('id');
			var div = $('#' +modID.replace(/mod-/, ''));

			// Create the remove-button
			var removeButton = $('<p><button>Remove Module</button></p>').appendTo(div).find('button');

			// And when you click it
			removeButton.click(function() {
				// Show the "mod" in module-listing and remove its class
				$('#' +modID).removeClass('in-use').show();

				// Remove the actual module
				div.remove();

				// And make PHP remove the XML-node from the XML-Controller
				// Todo
			});
		});
	}
};

ModuleListing.init();