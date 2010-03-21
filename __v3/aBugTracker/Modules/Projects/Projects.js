aFramework.modules.Projects = {
	run: function () {
		this.fisheyeMenu();
	}, 

	fisheyeMenu: function () {
		// Build the required HTML
		var fisheye = $('<div id="fisheye-projects"><div class="container"></div></div>')
						.appendTo('#projects')
						.find('div');

		$('#projects li').each(function () {
			var li		= $(this);
			var link	= li.find('a');
			var text	= li.text();
			var img		= link.find('img').clone();

			$('<a href="' 
				+ link.attr('href') 
				+ '" class="item"><span>' 
				+ text 
				+ '</span></a>')
					.append(img)
					.appendTo(fisheye);
		});

		// Run fisheye
		fisheye.parent().Fisheye({
			maxWidth:	76,
			items:		'a',
			itemsText:	'span',
			container:	'div.container',
			items:		'a.item', 
			itemWidth:	64,
			proximity:	80,
			halign:		'center'
		});
	}
};
