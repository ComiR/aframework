$(function () {
	var removeActive = function (where) {
		var w = where || 'h3, h4';
		$('#new-debug').find(w).removeClass('active');
	};

	// If user clicks outside menu, close all open menus
	$(document.body).click(function (e) {
		var clicked = $(e.target);

		if (!(clicked.is('#new-debug') || clicked.parents('#new-debug').length)) {
			removeActive();
		}
	});

	$('#new-debug').find('h3, h4').click(function () {
		var t = $(this);

		if (t.is('.active')) {
			removeActive(t[0].nodeName);
		}
		else {
			removeActive(t[0].nodeName);
			t.addClass('active');
		}
	});

/*	// If user clicks first level of menu expand drop-down
	$('#new-debug')
		.find('h3')
			.click(function () {
				var t = $(this);

				if (t.is('.active')) {
					removeActive();
				}
				else {
					removeActive();
					t.addClass('active');
				}
		//	})
		//	.mouseover(function () {
		
			});

	var secondLevelOverTimeout = false;

	// If user hovers second level of menu items
	$('#new-debug')
		.find('h4')
			.mouseover(function () {
				var t = $(this);

				if (secondLevelOverTimeout) {
					clearTimeout(secondLevelOverTimeout);
				}
				
				secondLevelOverTimeout = setTimeout(function () {
					if (!t.is('.active')) {
						removeActive('h4');
						t.addClass('active');
					}
				}, 1000);
			})
			.mouseout(function () {
				var t = $(this);

				if (secondLevelOverTimeout) {
					clearTimeout(secondLevelOverTimeout);
				}

				setTimeout(function () {
					t.removeClass('active');
				}, 1000);
			}); */
});