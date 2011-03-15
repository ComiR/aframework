jQuery.fn.indicateUnsaved = function () {
	return this.each(function () {
		var t		= $(this);
		var inputs	= t.find(':input[name]');
		var submit	= t.find('input[type=submit]');

		var indUns	= function () {
			$('<abbr class="unsaved" title="' + Lang.get('The content is unsaved') + '">*</abbr>').appendTo(t.find('h2'));

			inputs.unbind('change', indUns);

		//	submit.attr('disabled', false);
		};

	//	submit.attr('disabled', true);

		inputs.change(indUns);

		$(document.body).click(function (e) {
			var clicked = $(e.target);

			if ((clicked.is('a') || clicked.parents('a').length) && (t.find('h2 abbr.unsaved').length && !confirm(Lang.get('You have unsaved changes - are you sure you want to navigate away form this page?')))) {
				return false;
			}
		});

	/*	inputs.each(function () {
			var input	= $(this);
			var oldVal	= input.val();
			var indUns	= function () {
				if (input.val() != oldVal) {
					$('<abbr class="unsaved" title="' + Lang.get('The content is unsaved') + '">*</abbr>').appendTo(t.find('h2'));

					input.unbind('change', indUns);
					input.unbind('keyup', indUns);
				}
			};

			if (input.is('[type=text], textarea')) {
				input.bind('keyup', indUns);
			}
			else {
				input.bind('change', indUns);
			}
		}); */
	});
};
