/**
 * @title:		Numeric DL
 * @version:	2.0
 * @author:		Andreas Lagerkvist
 * @date:		2008-08-31
 * @url:		http://andreaslagerkvist.com/jquery/numeric-definition-list/
 * @license:	http://creativecommons.org/licenses/by/3.0/
 * @copyright:	2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * @requires:	jQuery
 * @usage:		jQuery('#glossary dl').numericDL(); Numbers every definition for a term where there's more than one definition.
 **/
jQuery.fn.numericDL = function() {
	jQuery('dt', this).each(function() {
		var numDDs = 0;
		var dt = jQuery(this);
		var dd = dt.next('dd');
		var i = 1;

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
};