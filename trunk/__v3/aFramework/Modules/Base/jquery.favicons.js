/***
@title:
Favicons

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
jquery

@does:
Appends or prepends favicons to external links.

@howto:
jQuery(document.body).favicons({insert: 'prependTo'}); would prepend favicons to every external link in the document.

@exampleHTML:
<ul>
	<li><a href="http://www.ap4a.co.uk/">David Anderson's Unfinished Symphony</a></li>
	<li><a href="http://ian.hixie.ch/">ian.hixie.ch</a></li>
	<li><a href="http://www.danwebb.net">DanWebb.net</a></li>
	<li><a href="http://www.dustindiaz.com/">DustinDiaz.com</a></li>
</ul>

@exampleJS:
jQuery('#jquery-favicons-example').favicons({insert: 'insertBefore'});
***/
jQuery.fn.favicons = function(conf) {
	var config = jQuery.extend({
		insert:		'appendTO', 
		defaultIco: 'favicon.png'
	}, conf);

	return this.each(function() {
		jQuery('a[href^="http://"]', this).each(function() {
			var link		= jQuery(this);
			var faviconURL	= link.attr('href').replace(/^(http:\/\/[^\/]+).*$/, '$1') +'/favicon.ico';
			var faviconIMG	= jQuery('<img src="' +config.defaultIco +'" alt="" />')[config.insert](link);
			var extImg		= new Image();

			extImg.src = faviconURL;

			if(extImg.complete) {
				faviconIMG.attr('src', faviconURL);
			}
			else {
				extImg.onload = function() {
					faviconIMG.attr('src', faviconURL);
				};
			}
		});
	});
};