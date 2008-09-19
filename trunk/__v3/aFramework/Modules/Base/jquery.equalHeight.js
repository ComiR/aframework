/***
@title:
Equal Height

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/equal-height/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, dimensions

@does:
Makes elements equal height by adjusting their min-height properties (unless IE6 in which case height is used).

@howto:
jQuery('#content, #secondary-content').equalHeight(); would make the elements with IDs 'content' and 'secondary-content' equal height.

@exampleHTML:
<p>Hi</p>

<p>Hi<br />Bye!</p>

@exampleJS:
jQuery('#jquery-equal-height-example p').equalHeight();
***/
jQuery.fn.equalHeight = function() {
	var height		= 0;
	var maxHeight	= 0;

	// Store the tallest element's height
	this.each(function() {
		height		= jQuery(this).outerHeight();
		maxHeight	= (height > maxHeight) ? height : maxHeight;
	});

	// Set element's min-height to tallest element's height
	return this.each(function() {
		var t			= jQuery(this);
		var innerHeight	= t.innerHeight();
		var outerHeight	= t.outerHeight();
		var notHeight	= outerHeight - innerHeight;
		var minHeight	= maxHeight - notHeight;
		var property	= jQuery.browser.msie && jQuery.browser.version < 7 ? 'height' : 'min-height';

		t.css(property, minHeight +'px');
	});
};