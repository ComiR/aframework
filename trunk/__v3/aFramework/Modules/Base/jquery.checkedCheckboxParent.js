/***
@title:
Checked checkbox-parent

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2008-11-13

@url:
http://andreaslagerkvist.com/jquery/checked-checkbox-parent/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Adds and removes a 'checked'-class to input[type=checkbox]'s parents.

@howto:
jQuery('form').checkedCheckboxParent(); would apply the plug-in to every checkbox in 'form'.

@exampleHTML:
<p>
	<label>
		<input type="checkbox" name="dummy" /> Click me to try it
	</labe>
</p>

@exampleJS:
jQuery('#jquery-checked-checkbox-parent-example').checkedCheckboxParent();
***/
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
