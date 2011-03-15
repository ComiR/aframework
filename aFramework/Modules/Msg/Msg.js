aFramework.modules.Msg = {
	run: function () {
		var msg = $('#msg');
		var isError = msg.find('strong').length;

		if (isError) {
			msg.addClass('error');
		}

		if (msg.length) {
			msg.fadeIn(500);

			if (isError) {
				$('<a href="#" class="close">' + Lang.get('Close') + '</a>').appendTo(msg).click(function () {
					msg.fadeOut(500);

					return false;
				});
			}
			else {
				setTimeout(function () {
					msg.fadeOut(500);
				}, 5000);
			}
		}
	}
};
