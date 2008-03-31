/**
 * NumericDLs 1.0
 *
 * Adds numbers to definition-descriptions if there are more than one for a term
 *
 * Usage: $.numericDLs();
 *
 * @class numericDLs
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
jQuery.numericDLs = function() {
	$('dt').each(function() {
		var numDDs = 0;
		var dt = $(this);
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