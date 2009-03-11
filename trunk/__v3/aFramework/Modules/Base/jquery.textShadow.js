/***
@title:
Text Shadow

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-10-17

@url:
http://andreaslagerkvist.com/jquery/text-shadow/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.textShadow.css

@does:
Adds a shadow to text

@howto:
jQuery('h2').textShadow();

@exampleHTML:
<p>I should have a shadow.</p>

@exampleJS:
jQuery('#jquery-text-shadow-example p').textShadow();
***/
jQuery.fn.textShadow = function () {
	return this.each(function () {
		var el = $(this);

		el.html('<span class="jquery-text-shadow-text">' + el.html() + '</span>').css('position', 'relative');
		jQuery('<span class="jquery-text-shadow">' + el.text() + '</span>').appendTo(el);
	});
};