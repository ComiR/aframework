(function ($) {
	$.fn.formatTextValue = function (f) {
		var format		= f || '';
		var formatLen	= format.length;

		return this.each(function () {
			var input	= $(this);
			var prevVal	= input.val();

			input.keyup(function () {
				var val		= input.val();
				var valLen	= val.length;
				var newVal	= '';

				if (prevVal != val) {
					prevVal = val;

					for (var i = 0; i < valLen; i++) {
						if (i < formatLen) {
							if (format.charAt(i) == '*') {
								newVal += val.charAt(i);
							}
							else if (val.charAt(i) != format.charAt(i)) {
								newVal += format.charAt(i) + val.charAt(i);
							}
							else {
								newVal += val.charAt(i);
							}
						}
						else {
							newVal += val.charAt(i);
						}
					}

					input.val(newVal);
				}
			});
		});
	};
})(jQuery);
