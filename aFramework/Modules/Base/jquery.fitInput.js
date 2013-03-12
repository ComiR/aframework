(function ($) {
	$.fn.fitInput = function () {
		return this.each(function () {
			var input	= $(this);
			var clone	= $('<div/>').text(input.val()).appendTo(document.body).css({
			//	'visibility':			'hidden', 
				'display':				'inline', 
				'font-size':			input.css('font-size'), 
				'font-family':			input.css('font-family'), 
				'line-height':			input.css('line-height'), 
				'font-weight':			input.css('font-weight'), 
				'margin':				0, 
				'padding':				0, 
				'border':				0
			});

			var fit = function () {
				input.css('width', clone.outerWidth() + 'px');
			};

			fit();

			input.keyup(function () {
				clone.text(input.val());
				fit();
			});
		});
	};
})(jQuery);
