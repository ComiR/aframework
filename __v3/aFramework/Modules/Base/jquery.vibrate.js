/***
@title:
Vibrate

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/vibrate/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jQuery

@does:
Makes an element vibrate.

@howto:
jQuery('#ad-area').vibrate();

@exampleHTML:
I should vibrate every now and then

@exampleJS:
jQuery('#jquery-vibrate-example').vibrate();
***/
jQuery.fn.vibrate = function(conf) {
	var config = jQuery.extend({
		speed:		30, 
		duration:	2000, 
		frequency:	5000, 
		spread:		3
	}, conf);

	return this.each(function() {
		var t = jQuery(this);

		var vibrate = function() {
			var topPos	= Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
			var leftPos	= Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
			var rotate	= Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);

			t.css({
				position:			'relative', 
				left:				leftPos +'px', 
				top:				topPos +'px', 
				WebkitTransform:	'rotate(' +rotate +'deg)'  // cheers to erik@birdy.nu for the rotation-idea
			});
		};

		var doVibration = function () {
			var vibrationInterval = setInterval(vibrate, config.speed);

			var stopVibration = function() {
				clearInterval(vibrationInterval);
				t.css('position', 'static');
			};

			setTimeout(stopVibration, config.duration);
		};

		setInterval(doVibration, config.frequency);
	});
};