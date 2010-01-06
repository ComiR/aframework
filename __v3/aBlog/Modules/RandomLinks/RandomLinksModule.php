<?php
	class aBlog_RandomLinksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['links'] = Links::get('RAND()', 'ASC', 0, Config::get('ablog.num_random_links')))) {
				self::$tplFile = false;
			}
		}
	}
?>
