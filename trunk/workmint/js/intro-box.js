WM.modules.IntroBox = {
	init: function (module) {
		module.find('ul.navigation').superSimpleTabs({
			show:		'fadeIn', 
			hide:		'fadeOut', 
			duration:	500
		}).find('a').click(function () {
			var introBoxNum = parseInt($(this).attr('href').replace(/[^0-9]/g, ''), 10);

			module.css('background-image', 'url(' + TEMPLATE_PATH + '/css/gfx/intro-box-bg-' + introBoxNum + '.jpg)');
		});
	}
};
