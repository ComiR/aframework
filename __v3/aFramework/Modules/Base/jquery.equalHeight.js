/***
@title:
TODO: Equal Height

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
jQuery

@does:
Makes elements equal height by adjusting their min-height properties (unless IE6 in which case height is used).

@usage:
jQuery('#content, #secondary-content').equalHeight(); would make the elements with IDs 'content' and 'secondary-content' equal height.

@exampleHTML:
<p>Hi</p>

<p>Hi<br />Bye!</p>

@exampleJS:
jQuery('#jquery-equal-height-example p:first-child, #jquery-equal-height-example p:last-child').equalHeight();
***/