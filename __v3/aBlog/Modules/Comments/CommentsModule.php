<?php
	class aBlog_CommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['url_str'])) {
				self::$tplVars['comments'] = Comments::getCommentsByArticleURLStr($_GET['url_str']);
			}
			elseif (isset($_GET['articles_id'])) {
				self::$tplVars['comments'] = Comments::getCommentsByArticleID($_GET['articles_id']);
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>