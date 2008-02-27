/**
 * Favicons 1.0
 *
 * Prepends or appends a favicon image to all external links
 *
 * Usage: $.favicons();
 * 
 * @class favicons
 * @param {Object} conf, custom config-object
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
$.favicons = function(conf) {
	var config = {
		insert: 'append', 
		defaultIco: 'favicon.png'
	};

	config = $.extend(config, conf);

	$('a[href^="http://"]').each(function() {
		var link = $(this);
		var faviconURL = link.attr('href').replace(/^(http:\/\/[^\/]+).*$/, '$1') +'/favicon.ico';
		var faviconIMG = $('<img src="' +config.defaultIco +'" alt="" />')[config.insert +'To'](link);
		var extImg = new Image();

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
};