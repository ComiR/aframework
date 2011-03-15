aFramework.modules.Page = {
	run: function () {
		$('#page textarea[name=content]').markItUp(mySettings);

		this.confirmDelete();
		this.advancedToggler();
		this.autoSlug();
		this.indicateUnsaved();
	},   

	indicateUnsaved: function () {
		$('#page').indicateUnsaved();
	},   

	autoSlug: function () {
		$('#page input[name=title]').keyup(function () {
			$('#page input[name=url_str]').val(Router.urlize($('#page input[name=title]').val())).change();
		});
	}, 

	advancedToggler: function () {
		var form = $('#page form');

		$('<p class="advanced-toggler"><label><input type="checkbox"/> ' + Lang.get('Advanced View') + '</label></p>')
			.insertBefore(form)
			.find('input')
				.click(function () {
					form.toggleClass('advanced');
				});
	},

	confirmDelete: function () {
		$('#page input[name=page_delete]').click(function () {
			return confirm(Lang.get('Are you sure?'));
		});
	}
};
