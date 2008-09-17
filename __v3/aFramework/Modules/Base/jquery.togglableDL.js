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
jQuery

@does:
Makes clicking dts show or hide the dds beneath it.

@howto:
jQuery('#faq dl').togglableDL();

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
jQuery.fn.togglableDL = function(conf) {
	var config = jQuery.extend({
		speed: 	100
	}, conf);

	return this.each(function() {
		var dds = $('dd', this).slideUp(config.speed);

		$('dt', this).each(function() {
			var dt = $(this);

			dt.html('<a href="#">' +dt.html() +'</a>').find('a').toggle(function() {
				var isDT = false;

				dt.nextAll().each(function() {
					if(isDT || $(this).is('dt')) {
						isDT = true;
						return;
					}

					$(this).slideDown(config.speed);
				});
			}, 
			function() {
				dds.slideUp(100);
			});
		});
	});
};