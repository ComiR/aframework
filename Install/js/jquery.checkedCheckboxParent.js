jQuery.fn.checkedCheckboxParent = function() {
	return this.each(function() {
		jQuery(':checkbox', this).each(function() {
			var check = $(this);
			var checkParent = function() {
				if(check.is(':checked')) {
					check.parent().addClass('checked');
				}
				else {
					check.parent().removeClass('checked');
				}
			};

			checkParent();
			check.click(checkParent);
		});
	});
};
