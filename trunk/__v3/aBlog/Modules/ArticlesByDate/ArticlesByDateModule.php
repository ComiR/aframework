<?php
	class aBlog_ArticlesByDateModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['dates'] = Articles::getGroupedByMonth();
		}
	}
?>
