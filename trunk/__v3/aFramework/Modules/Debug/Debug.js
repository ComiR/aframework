aFramework.modules.Debug = {
	run: function () {
		var removeActive = function (where) {
			var w = where || 'h3, h4';
			$('#debug').find(w).removeClass('active');
		};

		// If user clicks outside menu, close all open menus
		$(document.body).click(function (e) {
			var clicked = $(e.target);

			if (!(clicked.is('#debug') || clicked.parents('#debug').length)) {
				removeActive();
			}
		});

		$('#debug').find('h3, h4').click(function () {
			var t = $(this);

			if (t.is('.active')) {
				removeActive(t[0].nodeName);
			}
			else {
				removeActive(t[0].nodeName);
				t.addClass('active');
			}
		});
	}
};