<?php
	class aBlog_ArticleNavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!isset(Router::$params['year']) or !isset(Router::$params['month']) or !isset(Router::$params['day'])) {
				return self::$tplFile = false;
			}

			$date = Router::$params['year'] . '-' . Router::$params['month'] . '-' . Router::$params['day'] . '';

			self::$tplVars['previous_article']	= Articles::get('pub_date', 'DESC', 0, 1, 'DATE_FORMAT(articles.pub_date, "%Y-%m-%d") < "' . $date . '"');
			self::$tplVars['next_article']		= Articles::get('pub_date', 'ASC', 0, 1, 'DATE_FORMAT(articles.pub_date, "%Y-%m-%d") > "' . $date . '"');
		}
	}
?>
