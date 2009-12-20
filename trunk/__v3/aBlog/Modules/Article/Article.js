aFramework.modules.Article = {
	run: function () {
		this.confirmDelete();
		this.advancedToggler();
		this.autoSlug();
	},   

	autoSlug: function () {
		$('#article input[name=title]').keyup(function () {
			$('#article input[name=url_str]').val(Router.urlize($('#article input[name=title]').val()));
		});
	}, 

	advancedToggler: function () {
		var form = $('#article form');

		$('<p class="advanced-toggler"><label><input type="checkbox"/> ' + Lang.get('Advanced View') + '</label></p>')
			.insertBefore(form)
			.find('input')
				.click(function () {
					form.toggleClass('advanced');
				});
	},

	confirmDelete: function () {
		$('#article input[name=article_delete]').click(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};