<?php
	class aBlog_RecentArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', 0, Config::get('ablog.num_recent_stuff'));
		}
	}
?>
