aFramework.modules.Projects = {
	run: function () {
		this.fisheyeMenu();
	}, 

	fisheyeMenu: function () {
		// Build the required HTML
		var fisheye = $('<div id="fisheye-projects" class="fisheye"><div class="fisheyeContainer"></div></div>').appendTo('#projects').find('div');

		$('#projects li').each(function () {
			var link	= $(this).find('a');
			var text	= link.text();
			var img		link.find('img').clone().attr('width', '30');

			$('<a href="' 
				+ link.attr('href') 
				+ '" class="fisheyeItem"><span>' 
				+ text 
				+ '</span></a>')
					.append(img)
					.appendTo(fisheye);
		});
	}
};
