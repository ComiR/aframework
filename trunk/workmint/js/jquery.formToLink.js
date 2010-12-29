/***
@title:
Form to Link

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2010-??-??

@url:
http://andreaslagerkvist.com/jquery/form-to-link/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2010 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Run this plug-in on a form or an input[type=submit] and it will insert a link after the element you run it on which, on click, will submit said form.

@howto:
jQuery('#post-comment input[type=submit]').formToLink();

@exampleHTML:
<form method="post" action="">
	<p>
		<input type="submit" value="Delete comment"/>
	</p>
</form>

@exampleJS:
jQuery('#jquery-form-to-link-example form').formToLink();
***/
jQuery.fn.formToLink = function (c) {
	var cls = c || 'jquery-form-to-link';

	return this.each(function () {
		var t		= $(this);
		var form	= t.is('form') ? t : t.parents('form').eq(0);
		var input	= t.is('input') ? t : t.find('input[type=submit]');

		$('<a href="#" class="' + cls + '">' + input.val() + '</a>').insertAfter(t).click(function () {
			form.submit();

			return false;
		});
	});
};
