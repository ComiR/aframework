/***
@title:
Max Length Form Controls

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/max-length-form-controls/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Gives form-controls with a 'maxlength-XXX'-class a max-length and prohibits user from entering more than set amount. It also displays number of characters user has left next to the control.

@howto:
jQuery(document.body).maxLengthFormControls();

@exampleHTML:
<p>
	<label>
		Dummy<br />
		<input type="text" name="dummy" class="maxlength-8" />
	</label>
</p>

@exampleJS:
jQuery('#jquery-max-length-form-controls-example').maxLengthFormControls();
***/
jQuery.fn.maxLengthFormControls = function(conf) {
	var config = jQuery.extend({
		remainingStr: 'remaining', 
		className: 'characters-remaining'
	}, conf);

	return this.each(function() {
		jQuery('*[class^="maxlength"]', this).each(function() {
			var t			= $(this);
			var maxLength	= t.attr('class').substring(10);
			var left		= maxLength - t.val().length;
			var charLeft	= jQuery('<span class="characters-left">' +left +' ' +config.remainingStr +'</span>').insertAfter(t);

			t.keyup(function() {
				if(t.val().length > maxLength) {
					t.val(t.val().substring(0, maxLength));
				}

				var left = maxLength - t.val().length;

				charLeft.text(left +' ' +config.remainingStr);
			});
		});
	});
};