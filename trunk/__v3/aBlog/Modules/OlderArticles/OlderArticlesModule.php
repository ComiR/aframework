<?php
	class aBlog_OlderArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', (ADMIN ? 0 : 1), Config::get('ablog.num_older_articles')))) {
				self::$tplFile = false;
			}
		}
	}
?>
