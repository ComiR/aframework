/***
@title:
Numeric DL

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/numeric-dl/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jQuery

@does:
Numbers definitions in a definition-list if there is more than one definition for a term.

@usage:
jQuery('#glossary dl').numericDL();

@exampleHTML:
<dl>
	<dt>Jug</dt>
	<dd>A small pitcher.</dd>
	<dd>Vulgar Slang. A woman's breasts.</dd>
	<dt>Bird</dt>
	<dd>The animal of the skies</dd>
</dl>

@exampleJS:
jQuery('#jquery-numeric-dl-example dl').numericDL();
***/
jQuery.fn.numericDL = function() {
	return this.each(function() {
		jQuery('dt', this).each(function() {
			var numDDs	= 0;
			var dt		= jQuery(this);
			var dd		= dt.next('dd');
			var i		= 1;

			while(dd.length) {
				dd = dd.next('dd');
				numDDs++;
			}

			if(numDDs > 1) {
				dd = dt.next('dd');

				while(dd.length) {
					dd.text('(' +i++ +') ' +dd.text());
					dd = dd.next('dd');
				}
			}
		});
	});
};