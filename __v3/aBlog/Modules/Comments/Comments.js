aFramework.modules.Comments = {
	run: function () {
		this.hijaxForms();
	}, 

	hijaxForms: function () {
		$('#comments input[type=submit]').click(function () {
			var btn				= $(this);
			var type			= btn.attr('name');
			var comment			= btn.parents('li').eq(0);
			var commentsID		= comment.find('input[name=comments_id]').val();
			var articlesID		= $('#comments input[name=articles_id]').val();

			// Mark as Spam
			if (type == 'comments_spam') {
				btn.val(Lang.get('Loading') + '...');

				$.post(
					Router.urlForModule('Comments'), 
					{
						comments_spam: 1, 
						comments_id: commentsID, 
						articles_id: articlesID
					}, 
					function () {
						btn.val(Lang.get('Mark as Ham')).attr('name', 'comments_ham');
						comment.addClass('spam');
					}
				);
			}
			// Mark as Ham
			else if (type == 'comments_ham') {
				btn.val(Lang.get('Loading') + '...');

				$.post(
					Router.urlForModule('Comments'), 
					{
						comments_ham: 1, 
						comments_id: commentsID, 
						articles_id: articlesID
					}, 
					function () {
						btn.val(Lang.get('Mark as Spam')).attr('name', 'comments_spam');
						comment.removeClass('spam');
					}
				);
			}
			// Delete
			else if (type == 'comments_delete') {
				if (confirm(Lang.get('Are you sure?'))) {
					btn.val(Lang.get('Loading') + '...');

					$.post(
						Router.urlForModule('Comments'), 
						{
							comments_delete: 1, 
							comments_id: commentsID, 
							articles_id: articlesID
						}, 
						function () {
							comment.hide(500, function () {
								comment.remove();
							});
						}
					);
				}
			}
			// Delete all
			else if (type == 'comments_delete_all_spam') {
				var oldVal = btn.val();	

				if (!$('#comments li.spam').length) {
					alert(Lang.get('There is no spam.'));
				}
				else if (confirm(Lang.get('Are you sure?'))) {
					btn.val(Lang.get('Loading') + '...');

					$.post(
						Router.urlForModule('Comments'), 
						{
							comments_delete_all_spam: 1, 
							articles_id: articlesID
						}, 
						function () {
							$('#comments li.spam').hide(500, function () {
								$(this).remove();
							});

							btn.val(oldVal);
						}
					);
				}
			}

			return false;
		});
	}
};
