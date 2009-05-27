aFramework.modules.Live = {
	run: function() {
		this.doToggleLink();
	}, 

	doToggleLink: function() {
		var show = Lang.get('Show live cam');
		var hide = Lang.get('Hide live cam');
		var live = jQuery('#live object');

		jQuery('<p><a href="#" id="live-toggler">' + show + '</a></p>').insertAfter('#live h2');
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