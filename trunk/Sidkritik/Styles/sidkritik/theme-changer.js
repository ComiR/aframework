(function () {
	var cookieName = 'sidkritik_style_theme';

	// Available themes
	var themes = {
		red:	'Red', 
		green:	'Green', 
		blue:	'Blue', 
		yellow:	'Yellow'
	};
	var numThemes = themes.length;

	// Change to user's selected theme
	var currentTheme = $.cookie(cookieName) || 'blue';

	$(document.body).addClass(currentTheme);

	// Build the theme-changer
	var themeChangerHTML = '<div id="theme-changer"><ul>';

	for (var i in themes) {
		themeChangerHTML += '<li><a href="#' + i + '">' + themes[i] + '</a></li>';
	}

	themeChangerHTML += '</ul></div>';

	var themeChanger = $(themeChangerHTML).appendTo('#wrapper');

	// Switch theme onclick
	themeChanger.find('a').click(function () {
		var body		= $(document.body);
		var newTheme	= $(this).attr('href').substr(1);

		for (var j in themes) {
			body.removeClass(j);
		}

		body.addClass(newTheme);

		$.cookie(cookieName, newTheme, {path: '/'});

		return false;
	});
})();
