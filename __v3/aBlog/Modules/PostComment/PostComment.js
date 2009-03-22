aFramework.modules.PostComment = {
	run: function () {
		this.liveValidation();
		this.hijaxForm();
	}, 

	liveValidation: function () {
		jQuery('#post-comment').liveValidation(jQuery.extend(aFramework.jQueryLiveValidation, {
			required: ['author', 'content']
		}));
	}, 

	hijaxForm: function () {
		var postComment = jQuery('#post-comment');

		postComment.find('form').ajaxForm({
			url: WEBROOT + '?module=PostComment', 
			beforeSubmit: function () {
				if (!postComment.find('img[alt=' + aFramework.jQueryLiveValidation.invalid + ']').length) {
					postComment.find('input[type=submit]').val(Lang.get('posting') + '...');

					return true;
				}

				return false;
			}, 
			success: function (data) {
				jQuery.get(WEBROOT + '?module=Comments&articles_id=' + postComment.find('input[name=articles_id]').val(), function (newComments) {
					jQuery('#comments').html(newComments);
				//	aFramework.modules.Comments.run(); // doesn't have one as of yet
				});

				postComment.html(data);
				aFramework.modules.PostComment.run();
			}
		});
	}
};