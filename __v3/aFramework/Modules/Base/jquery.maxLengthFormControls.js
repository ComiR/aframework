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
jQuery

@does:
This plug-in gives form-controls with a 'maxlength-XXX'-class a max-length and prohibits user from entering more than set amount. It also displays number of characters user has left next to the control.

@usage:
jQuery(document.body).maxLengthFormControls();

@exampleHTML:
<p>
	<label>
		Dummy<br />
		<input type="text" name="dummy" class="maxlength-100" />
	</label>
</p>

@exampleJS:
jQuery('#jquery-max-length-form-controls-example').maxLengthFormControls();
***/