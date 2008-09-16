jQuery.ui.plugin.add('droppable', 'mouseover', {
	over: function(e, ui) {
		if(typeof(ui.options.mouseover) == 'function') {
			ui.options.mouseover(e, ui);
		}
	}
});

jQuery.ui.plugin.add('droppable', 'mouseout', {
	out: function(e, ui) {
		if(typeof(ui.options.mouseout) == 'function') {
			ui.options.mouseout(e, ui);
		}
	}
});