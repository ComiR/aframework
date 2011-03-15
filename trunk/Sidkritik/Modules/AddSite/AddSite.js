aFramework.modules.AddSite = {
	run: function () {
		this.initMarkItUp();
		this.liveThumbPreview();
	}, 

	initMarkItUp: function () {
		$('#add-site textarea[name=content]').markItUp(mySettings);
	}, 

	liveThumbPreview: function () {
		var addSite	= $('#add-site');
		var preview = $('<div id="add-site-live-thumb-preview"></div>').appendTo(addSite).hide();

		addSite.find('input[name=thumb_url]').keyup(function () {
			var url = $(this).val();

			if (url.length) {
				preview.addClass('loading').show();

				var preloader = new Image();
				preloader.src = url;

				var onLoad = function () {
					var newThumb = $('<img src="' + url + '" alt=""/>');

					newThumb.appendTo(document.body).css({
						position:	'absolute', 
						left:		'-100080px', 
						top:		'-100080px'
					});

					if (newThumb.width()) {
						preview.removeClass('loading').html('').append(newThumb.css('position', 'static'));
					}
					else {
						newThumb.remove();
					}
				};

				if (preloader.complete) {
					onLoad();
				}
				else {
					preloader.onload = function () {
						onLoad();
					};
				}
			}
			else {
				preview.hide();
			}
		});
	}
};
