/***
@title:
Togglable DL

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/togglable-dl/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Use this plug-in on your definition-lists (dl-elements) to allow the dd:s for a dt to be toggled when clicking the dt. Don't use it unless it's semantically a definition list of some kind though :)

@howto:
jQuery('#faq dl').togglableDL(); would make every dl in #faq 'togglable'.

@exampleHTML:
<dl>
	<dt>Who are you?</dt>
	<dd>Me</dd>
	<dt>Where do you live?</dt>
	<dd>Here</dd>
</dl>

@exampleJS:
jQuery('#jquery-togglable-dl-example dl').togglableDL();
***/
jQuery.fn.togglableDL = function (conf) {
	var config = jQuery.extend({
		speed: 	100
	}, conf);

	return this.each(function () {
		var dds = jQuery('dd', this).slideUp(config.speed);

		jQuery('dt', this).each(function () {
			var dt = jQuery(this);

			dt.html('<a href="#">' + dt.html() + '</a>').find('a').toggle(function () {
				var isDT = false;

				dt.nextAll().each(function () {
					if (isDT || jQuery(this).is('dt')) {
						isDT = true;
						return;
					}

					jQuery(this).slideDown(config.speed);
				});
			}, 
			function () {
				var isDT = false;

				dt.nextAll().each(function () {
					if (isDT || jQuery(this).is('dt')) {
						isDT = true;
						return;
					}

					jQuery(this).slideUp(config.speed);
				});
			});
		});
	});
};