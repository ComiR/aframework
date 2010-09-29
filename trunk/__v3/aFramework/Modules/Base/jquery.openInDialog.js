jQuery.fn.openInDialog = function (cb, ct) {
    var closeText = ct || 'Close';
    var dialog = $('#jquery-open-in-dialog');
    var overlay = $('#jquery-open-in-dialog-overlay');
    var callback = (typeof(cb) == 'function') ? cb : function () {};

	if (!dialog.length) {
        dialog = $('<div id="jquery-open-in-dialog"></div>').appendTo(document.body).hide();
        overlay = $('<div id="jquery-open-in-dialog-overlay"></div>').appendTo(document.body).hide();

		overlay.click(function (e) {
            var clicked = $(e.target);

			if (!clicked.is('#jquery-open-in-dialog') && !clicked.parents('#jquery-open-in-dialog').length && !clicked.is('.ui-datepicker') && !clicked.parents('.ui-datepicker').length) {
                hideDialog();
            }
        });
    }

	var showDialog = function (content) {
        overlay.show();

		if (dialog.is('.in-page')) {
            dialog.append(content.show()).show().center(true);
        }
		else {
            dialog.html(content).show().center(true);
        }

		if (jQuery.fn.bgiframe) {
			dialog.bgiframe();
		}

        addCloseLink();
        callback(dialog);
    };

	var hideDialog = function () {
        if (dialog.is('.in-page')) {
            dialog.find('>div').appendTo(document.body).hide()
        }
        dialog.hide().html('').attr('class', '');
        overlay.hide();
    };

	var addCloseLink = function () {
        var dialogHasScroll = dialog[0].clientHeight < dialog[0].scrollHeight;
        var closeLinks = '<a href="#" class="close-dialog">' + closeText + '</a>';
			closeLinks += dialogHasScroll ? '<a href="#" class="close-dialog-bottom">' + closeText + '</a>' : '';

		$(closeLinks).appendTo(dialog).click(function () {
            hideDialog();
            return false;
        });
    };

	return this.each(function () {
        var link	= $(this);
        var href	= link[0].getAttribute('href', 2);
		var hashPos	= href.indexOf('#');

		if (hashPos != -1 && hashPos != 0) {
			href = href.substring(hashPos);
		}

		link.click(function () {
            dialog.html('').attr('class', '');

			if (href.indexOf('#') == 0) {
                var content = $(href);
                dialog.addClass('in-page');
                showDialog(content);
            }
			else {
                dialog.removeClass('in-page');
                $.get(href, function (content) {
                    showDialog(content);
                });
            }

			return false;
        });
    });
};
