aFramework.modules.Help = {
	run: function () {
		this.togglableHelp();
		this.clickableModules();
	}, 

	togglableHelp: function () {
		$('#help h2').wrapInner('<a href="#"/>').find('a').click(function () {
			$(document.body).toggleClass('help');

			return false;
		});

		$('<p>' + Lang.get('Click any element on the page to get help.') + '</p>').appendTo('#help');
	}, 

	clickableModules: function () {
		var helpBox = $('<div id="help-box"/>').appendTo(document.body).fadeOut(0);

		$('div[title]').each(function () {
			var mod		= $(this);
			var info	= mod.attr('title');

			mod.data('aframework-help-title', info); // .attr('title', '');
		});

		$(document.body).click(function (e) {
			var clicked	= $(e.target);
				clicked	= clicked.parents('div[title]').length ? clicked.parents('div[title]') : clicked;
			var info	= clicked.data('aframework-help-title');

			if (info && $(this).is('.help')) {
				var offset = clicked.offset();

				helpBox.html(info).css({
					left:		(offset.left - helpBox.width()) + 'px', 
					top:		(offset.top - helpBox.height()) + 'px'
				}).fadeIn(300);
			}
			else {
				helpBox.fadeOut(300);
			}
		});
	}
};
