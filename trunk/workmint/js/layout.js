WM.modules.Wrapper = {
	init: function () {
		this.insertBottomArrows('#bottom ul a');
		this.firstLastChildClasses();
		this.hoverClasses();
	}, 

	insertBottomArrows: function (where) {
		$(where).append('<img src="' + TEMPLATE_PATH + '/css/gfx/arrow-right-orange-dark-bg.gif" alt=""/>');
	}, 

	firstLastChildClasses: function () {
		$('#bottom li:last-child, #intro-box ul.navigation li:last-child, #page div.content > *:last-child, #comments li:last-child, #articles li:last-child, #page-navigation ul ul li:last-child').addClass('last-child');
		$('#intro-box ul.navigation li:first-child').addClass('first-child');
	}, 

	hoverClasses: function () {
		$('#page-navigation li').mouseover(function () {
			$(this).addClass('hover');
		}).mouseout(function () {
			$(this).removeClass('hover');
		});
	}
};
