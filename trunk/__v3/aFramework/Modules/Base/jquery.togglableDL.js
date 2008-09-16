/**
 * @title:		Togglable DL
 * @version:	1.0
 * @author:		Andreas Lagerkvist
 * @date:		2008-09-16
 * @url:		http://andreaslagerkvist.com/jquery/togglable-dl/
 * @license:	http://creativecommons.org/licenses/by/3.0/
 * @copyright:	2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * @requires:	jQuery
 * @usage:		jQuery('#faq dl').togglableDL(); adds links to all dt:s in #faq dl and when you click them hides/shows the dd:s connected to the dt.
 **/
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