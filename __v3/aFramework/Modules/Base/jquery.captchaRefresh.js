/***
@title:
Captcha Refresh

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-09-19

@url:
http://andreaslagerkvist.com/jquery/captcha-refresh/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
If you use a so called CAPTCHA-image on your site then you can use this plug-in to allow users to click your CAPTCHA in order to generate a new random string - provided your CAPTHA-script generates a random image every time it is called.

@howto:
jQuery(document.body).captchaRefresh({src: '/captcha.png'}); Would make all images with '/captcha.png' as their source in the document clickable.

Run Captcha Refresh on a parent-element of the captcha image(s). Running it on document.body affects every CAPTCHA-image in the document.

@exampleHTML:
<img src="/?module=Captcha" alt="" />

@exampleJS:
// I'm not running it because I already use captchaRefresh on my site
// jQuery(document.body).captchaRefresh({src: WEBROOT + '?module=Captcha'});
***/
jQuery.fn.captchaRefresh = function (conf) {
	var config = jQuery.extend({
		src:	'/captcha.png', 
		title:	'Can\'t see what it says? Click me to get a new string.'
	}, conf);

	return this.each(function () {
		jQuery('img[src^="' + config.src + '"]', this).attr('title', config.title);

		jQuery(this).click(function(event) {
			var clicked = jQuery(event.target);

			if (clicked.is('img[src^="' + config.src + '"]')) {
				var now			= new Date();
				var separator	= config.src.indexOf('?') == -1 ? '?' : '&';

				clicked.attr('src', config.src + separator + now.getTime());
			}
		});
	});
};