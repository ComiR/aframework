<?php
	class aBlog_OlderArticlesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['articles'] = Articles::get('pub_date', 'DESC', 1, 3))) {
				self::$tplFile = false;
			}
		}
	}
?>