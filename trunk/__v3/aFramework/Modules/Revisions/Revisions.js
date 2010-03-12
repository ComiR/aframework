aFramework.modules.Revisions = {
	run: function () {
		if ($('#revisions').prev('div').find('textarea[name=content]').length) {
			this.revisionTabs();
		}
		else {
			this.togglableRevisions();
		}
	}, 

	revisionTabs: function () {
		var revisions		= $('#revisions');
		var textarea		= revisions.prev('div').find('textarea[name=content]');
		var insertAround	= textarea.is('.markItUpEditor') ? textarea.parents('div.markItUp').parent() : textarea;

		// Hide the normal revisions
		revisions.hide();

		// Add the latest revision as one of the revisions
		$('<li><h4>' + Lang.get('Latest Revision') + '</h4><p><textarea name="revision_latest" rows="10" cols="40">' + textarea.val() + '</textarea></p></li>')
			.prependTo(revisions.find('ul'));

		// Create revision list that toggles revision
		var revisionList = $('<ul class="revision-list"/>').insertBefore(insertAround);

		revisions.find('li').each(function (i) {
			var revHead	= $(this).find('h4');
			var revTxt	= $(this).find('textarea');
			var classN	= (i == 0) ? ' class="selected"' : '';

			$('<li' + classN + '><a href="#" title="' + revHead.text() + '">' + (i + 1) + '</a></li>')
				.appendTo(revisionList)
				.find('a')
					.click(function () {
						textarea.val(revTxt.val()).change();
						revisionList.find('li').removeClass('selected');
						$(this).parent().addClass('selected');

						return false;
					});
		});
	}, 

	togglableRevisions: function () {
		$('#revisions h4').each(function () {
			var h4 = $(this);

			h4.wrapInner('<a href="#"/>').find('a').click(function () {
				h4.next('p').slideToggle(300, function () {
					var textarea = $(this).find('textarea')[0];

					textarea.focus();
					textarea.select();
				});

				return false;
			});
		});
	}
};
