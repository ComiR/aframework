<?php
	class aBlog_RecentArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', 0, Config::get('ablog.num_recent_stuff'));

			$start = (isset($_GET['recent_articles_start']) and is_numeric($_GET['recent_articles_start']) and $_GET['recent_articles_start'] > 0) ? $_GET['recent_articles_start'] : 0;

			if (!(self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', $start, Config::get('ablog.num_recent_stuff')))) {
				self::$tplFile = false;
			}
			else {
				self::$tplVars['start']	= $start + 1;
				self::$tplVars['prev']	= $start === 0 ? false : $start - Config::get('ablog.num_recent_stuff');
				self::$tplVars['next']	= $start + Config::get('ablog.num_recent_stuff');
			}
		}
	}
?>
