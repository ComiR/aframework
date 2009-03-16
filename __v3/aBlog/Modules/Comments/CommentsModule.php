<?php
	class aBlog_CommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['url_str'])) {
				self::$tplVars['comments'] = Comments::getCommentsByArticleURLStr($_GET['url_str']);
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>