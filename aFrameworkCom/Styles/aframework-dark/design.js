aFramework.styles.aFrameworkDark = {
	run: function () {
		this.togglableInfo();
	}, 

	togglableInfo: function () {
		$('#page').hide();

		$('<a href="#" class="info-toggler">' + Lang.get('Learn more') + '</a>')
			.insertBefore('#page')
			.click(function () {
				$('#page').toggle();

				return false;
			});
	}
};
