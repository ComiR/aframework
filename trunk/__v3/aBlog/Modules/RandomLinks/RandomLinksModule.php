<?php
	class aBlog_RandomLinksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['links'] = Links::get('RAND()', 'ASC', 0, 4))) {
				self::$tplFile = false;
			}
		}
	}
?>
