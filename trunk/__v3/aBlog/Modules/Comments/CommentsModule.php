<?php
	class aBlog_CommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['comments_delete']) and ADMIN) {
				self::deleteComment($_POST['comments_id']);
			}

			if (isset(Router::$params['url_str'])) {
				self::$tplVars['comments'] = Comments::getCommentsByArticleURLStr(Router::$params['url_str']);
			}
			elseif (isset($_GET['articles_id'])) {
				self::$tplVars['comments'] = Comments::getCommentsByArticleID($_GET['articles_id']);
			}
			else {
				self::$tplFile = false;
			}
		}

		private static function deleteComment ($id) {
			Comments::delete($id);

			if (!XHR) {
				redirect('?deleted_comment');
			}
		}
	}
?>