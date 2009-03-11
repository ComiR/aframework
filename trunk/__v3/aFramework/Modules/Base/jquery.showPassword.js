jQuery.fn.showPassword = function(conf) {
	var config = $.extend({
		view_password:	'View password', 
		class:			'password-toggler'
	}, conf);

	return this.each(function() {
		jQuery('input[type=password]', this).each(function() {
			var field		= jQuery(this);
			var check		= jQuery('<label class="' + config.class + '"><input type="checkbox" /> ' + config.view_password + '</label>');
			var parentLabel	= field.parents('label');

			if ( parentLabel.length ) {
				check.insertAfter(parentLabel);
			}
			else {
				check.insertAfter(field);
			}

			check.find('input').click(function() {
				if ( jQuery(this).is(':checked') ) {
				//	field.attr('type', 'text'); // strange, this threw errors
					field[0].type = 'text';
				}
				else {
				//	field.attr('type', 'password');
					field[0].type = 'password';
				}
			});
		});
	});
};
