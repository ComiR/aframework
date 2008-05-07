/**
 * Vibrate 1.0
 *
 * Makes an element vibrate
 *
 * Usage: jQuery('#my-annoying-ad').vibrate();
 *
 * @class vibrate
 * @param {Object} conf, custom config-object
 *
 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
 */
jQuery.fn.vibrate = function(conf) {
	var config = {
		speed: 30, 
		duration: 2000, 
		frequency: 10000, 
		spread: 3
	};

	config = jQuery.extend(config, conf);

	return this.each(function() {
		var t = jQuery(this);

		var vibrate = function() {
			var topPos = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
			var leftPos = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
			t.css({position: 'relative', left: leftPos +'px', top: topPos +'px'});
		};

		var doVibration = function () {
			var vibrationInterval = setInterval(vibrate, config.speed);

			var stopVibration = function() {
				clearInterval(vibrationInterval);
				t.css({position: 'static'});
			};

			setTimeout(stopVibration, config.duration);
		};

		setInterval(doVibration, config.frequency);
	});
};