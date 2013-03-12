(function ($) {
	$.fn.dropDown = function (el) {
		var el = $(el);

		return this.each(function () {
			var dd = $(this);

			el.click(function () {
				dd.toggleClass('open');
			});

			$(document.body).click(function (e) {
				var clicked = $(e.target);

				if (!clicked.is(el)) {
					dd.removeClass('open');
				}
			});

			dd.find('a').click(function () {
				dd.removeClass('open');
			});
		});
	};
})(jQuery);
