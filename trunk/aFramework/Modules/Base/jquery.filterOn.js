(function ($) {
	$.fn.filterOn = function (what, conf) {
		var config = $.extend({
			hidden:		false, 
			callback:	function () {}, 
			show:		'show', 
			hide:		'hide', 
			duration:	0
		}, conf);

		var items		= $(this);
		var filterer	= $(what);
		var filterName	= filterer.attr('name');

		if (config.hidden) {
			items.hide();
		}

		filterer.change(function () {
			var val = $(this).val();

			if (val == 'filter_on_all') {
				items[config.show](config.duration);
			}
			else if (val == 0) {
				if (config.hidden) {
					items[config.hide](config.duration);
				}
				else {
					items[config.show](config.duration);
				}
			}
			else {
				items[config.hide](config.duration);

				setTimeout(function () {
					items.filter('.' + filterName + '-' + val)[config.show](config.duration);
				}, config.duration + 1);
			}

			config.callback(val);
		});

		return this;
	};
})(jQuery);
