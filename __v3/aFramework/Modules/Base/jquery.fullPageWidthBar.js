/*
@title:
Full Page width Bar

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2010-??-??

@url:
http://andreaslagerkvist.com/jquery/full-page-width-bar/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2010 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This plug-in makes an element occupy up the full width of the browser even if it's contained within an element that has a smaller width.

@howto:
jQuery('#header, #footer').fullPageWidthBar();

@exampleHTML:
<div style="background: red; padding: 10px 0;">
	This element should occupy the entire width of the browser window
</div>

@exampleJS:
jQuery('#jquery-full-page-width-bar-example div').fullPageWidthBar();
*/
jQuery.fn.fullPageWidthBar = function (config) {
	var conf = $.extend({
		wrapper:	'#wrapper'
	}, config);

	var els = this;

	var bar = function () {
		var docWidth	= $(document).width();
		var wrapWidth	= $(conf.wrapper).width();

		if (docWidth > wrapWidth) {
			var distance = (docWidth - wrapWidth) / 2;

			els.css({
				marginLeft:		'-' + distance + 'px', 
				marginRight:	'-' + distance + 'px', 
				paddingLeft:	distance + 'px', 
				paddingRight:	distance + 'px'
			});
		}
	};

	bar();
	$(window).resize(bar);

	return els;
};
