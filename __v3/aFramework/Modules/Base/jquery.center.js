/***
@title:
Center

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-17

@url:
http://andreaslagerkvist.com/jquery/center/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, dimensions

@does:
Centers an element on the screen using either position: fixed or absolute.

@howto:
jQuery('#my-element').center(); would center the element with ID 'my-element' using fixed position.

@exampleHTML:
<p>I should be fixed centered</p>

<p>I should be absolutely centered</p>

@exampleJS:
jQuery('#jquery-center-example p:first-child').center();
jQuery('#jquery-center-example p:last-child').center(true);
***/
jQuery.fn.center = function(absolute) {
	return this.each(function() {
		var t = jQuery(this);

		t.css({
			position:	absolute ? 'absolute' : 'fixed', 
			left:		'50%', 
			top:		'50%', 
			zIndex:		'99'
		}).css({
			marginLeft:	'-' +(t.outerWidth() / 2) +'px', 
			marginTOp:	'-' +(t.outerHeight() / 2) +'px'
		});
	});
};