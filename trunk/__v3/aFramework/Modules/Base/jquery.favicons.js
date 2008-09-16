/***
@title:
TODO: Favicons

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/favicons/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jQuery

@does:
Appends or prepends favicons to external links.

@usage:
jQuery(document.body).favicons({insert: 'prependTo'}); would prepend favicons to every external link in the document.

@exampleHTML:
<ul>
	<li><a href="http://www.ap4a.co.uk/" title="Visit David Anderson's Unfinished Symphony">David Anderson's Unfinished Symphony</a></li>
	<li><a href="http://ian.hixie.ch/" title="Visit ian.hixie.ch">ian.hixie.ch</a></li>
	<li><a href="http://www.danwebb.net" title="Visit DanWebb.net">DanWebb.net</a></li>
	<li><a href="http://www.dustindiaz.com/" title="Visit DustinDiaz.com">DustinDiaz.com</a></li>
</ul>

@exampleJS:
jQuery('#jquery-favicons-example').favicons({insert: 'insertBefore'});
***/