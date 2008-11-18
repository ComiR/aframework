/***
@title:
Ajax Loader

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-09-25

@url:
http://andreaslagerkvist.com/jquery/ajax-loader/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.ajaxLoader.css, jquery.ajaxLoader.gif

@does:
Overlays a loading-box on top of selected element(s) that prohibits users from interacting with said element(s).

@howto:
jQuery('#contact').ajaxLoader(); would add the overlay on top of the #contact-element.

When you want to remove the loader simply run jQuery('#contact').ajaxLoaderRemove();

@exampleHTML:
I should start loading after a couple of seconds, then load for a couple more and then stop loading only to start again after a couple of seconds. And so on.

@exampleJS:
setInterval(function() {
	jQuery('#jquery-ajax-loader-example').ajaxLoader();
	setTimeout(function() {
		jQuery('#jquery-ajax-loader-example').ajaxLoaderRemove();
	}, 2000);
}, 4000);
***/
jQuery.fn.ajaxLoader = function(conf) {
	var config = jQuery.extend({
		className:	'jquery-ajax-loader'
	}, conf);

	return this.each(function() {
		var t = jQuery(this);

		if(!this.ajaxLoader) {
			var offset = t.offset();
			var dim = {
				left:	offset.left, 
				top:	offset.top, 
				width:	t.outerWidth(), 
				height:	t.outerHeight()
			};

			this.ajaxLoader = jQuery('<div class="' +config.className +'"></div>').css({
				position:	'absolute', 
				left:		dim.left +'px', 
				top:		dim.top +'px',
				width:		dim.width +'px',
				height:		dim.height +'px'
			}).appendTo(document.body).hide();
		}

		this.ajaxLoader.fadeIn(500);
	});
};

jQuery.fn.ajaxLoaderRemove = function() {
	return this.each(function() {
		if(this.ajaxLoader) {
			this.ajaxLoader.fadeOut(500);
		}
	});
};