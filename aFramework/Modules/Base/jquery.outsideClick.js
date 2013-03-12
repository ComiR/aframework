(function ($) {
	$.fn.outsideClick = function (callback) {
		return this.each(function () {
			var mod = $(this);
			var isOver = false;

			if (typeof(callback) != 'function') {
				callback = function (mod) {
					mod.hide();
				};
			}

			mod.hover(function () {
				isOver = true;
			}, function () {
				isOver = false;
			});

			$(document.body).mouseup(function () {
				if (!isOver) {
					callback(mod);
				}
			});
		});
	};
})(jQuery);
