aFramework.modules.Live = {
	run: function() {
		this.doToggleLink();
	}, 

	doToggleLink: function() {
		var show = Lang::get('show_live_cam');
		var hide = Lang::get('hide_live_cam');
		var live = jQuery('#live object');

		jQuery('<p><a href="#" id="live-toggler">' +show +'</a></p>').insertAfter('#live h2');
		live.hide();

		$('#live-toggler').toggle(function() {
			$(this).text(hide);
			live.show();
		}, function() {
			$(this).text(show);
			live.hide();
		});
	}
};