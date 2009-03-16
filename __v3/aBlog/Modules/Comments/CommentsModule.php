<?php
	class aBlog_CommentsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['url_str'])) {
				self::showCommentsByArticleURLStr($_GET['url_str']);
			}
			else {
				self::$tplFile = false;
			}
		}

		private static function showCommentsByArticleURLStr ($urlStr) {
			if (!(self::$tplVars['comments'] = Comments::getCommentsByArticleURLStr($urlStr))) {
				self::$tplFile = false;
			}
		}
	}
?>