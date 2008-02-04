function SplitSelects()
{
	$('select.split-up').each(function(i)
	{
		// Give this select an ID for use later
		$(this).attr('id', 'ms-child-select-' +i);
	
		// For storing all options in optgroups
		var opts = new Array();

		// Get all optgroups, create new select
		var newSelect = '<p><select id="ms-parent-select-' +i +'">';
		$(this).find('optgroup').each(function(i)
		{
			newSelect += '<option value="' +i +'">' +$(this).attr('label') +'</option>';

			opts[i] = $(this).html();
		});
		newSelect += '</select></p>';

		// Remove everything but the first set of options, make first option selected
		$(this).html(opts[0]);
		$(this).find('> option:first-child').attr('selected', 'selected');

		// Insert new select before old('s parent (assumed to be in a p or div))
		$(newSelect).insertBefore($(this).parent());

		// Add onchange event on parent-select
		$('#ms-parent-select-' +i).change(function()
		{
			// Populate child-select with parent-select's optgroup's options, make first option selected
			$('#ms-child-select-' +i).html(opts[$(this).attr('value')]);
			$('#ms-child-select-' +i +' > option:first-child').attr('selected', 'selected');
		});
	});
}