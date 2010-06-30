<?php
	class aBlog_ArticleNavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!isset(aBlog_ArticleModule::$tplVars['article'])) {
				return self::$tplFile = false;
			}

			$date = date('Y-m-d H:i:s', strtotime(aBlog_ArticleModule::$tplVars['article']['pub_date']));

			self::$tplVars['previous_article']	= Articles::getPrevious($date);
			self::$tplVars['next_article']		= Articles::getNext($date);
		}
	}
?>
