aFramework.modules.PostComment = {
	run: function () {
		this.liveValidation();
		this.hijaxForm();
	}, 

	liveValidation: function () {
		jQuery('#post-comment').liveValidation(jQuery.extend(aFramework.jQueryLiveValidation, {
			required: ['author', 'content'], 
			optional: ['website', 'email']
		}));
	}, 

	hijaxForm: function () {
		var postComment = jQuery('#post-comment');

		postComment.find('form').ajaxForm({
			url: Router.urlForModule('PostComment'), 
			beforeSubmit: function () {
				if (!postComment.find('img[alt=' + aFramework.jQueryLiveValidation.invalid + ']').length) {
					postComment.find('input[type=submit]').val(Lang.get('Posting') + '...');

					return true;
				}

				return false;
			}, 
			success: function (data) {
				jQuery.get(Router.urlForModule('Comments') + '&articles_id=' + postComment.find('input[name=articles_id]').val(), function (newComments) {
					jQuery('#comments').html(newComments);
					aFramework.modules.Comments.run(); // Should use custom events...
				});

				postComment.html(data);
				aFramework.modules.PostComment.run();
			}
		});
	}
};
