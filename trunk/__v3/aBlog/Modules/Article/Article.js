aFramework.modules.Article = {
	run: function () {
		$('#article textarea[name=content]').markItUp(mySettings);

		this.confirmDelete();
		this.advancedToggler();
		this.autoSlug();
		this.indicateUnsaved();
		this.autoCompleteTags();
	},   

	autoCompleteTags: function () {
		// todo...
	}, 

	indicateUnsaved: function () {
		$('#article').indicateUnsaved();
	}, 

	autoSlug: function () {
		$('#article input[name=title]').keyup(function () {
			$('#article input[name=url_str]').val(Router.urlize($('#article input[name=title]').val())).change();
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
