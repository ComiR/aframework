<?php
	class aBlog_RecentArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$numArticles	= Config::get('ablog.num_recent_articles');
			$start			= (isset($_GET['recent_articles_start']) and is_numeric($_GET['recent_articles_start']) and $_GET['recent_articles_start'] > 0) ? $_GET['recent_articles_start'] : 0;

			if (!(self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', $start, $numArticles))) {
				self::$tplFile = false;
			}
			else {
				self::$tplVars['start']	= $start + 1;
				self::$tplVars['prev']	= $start === 0 ? false : $start - $numArticles;
				self::$tplVars['next']	= $start + $numArticles;
			}
		}
	}
?>
