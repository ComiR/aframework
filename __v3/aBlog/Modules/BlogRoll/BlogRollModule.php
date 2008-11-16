<?php
	class aBlog_BlogRollModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::$tplVars['links'] = Links::getLinks();

			if(!self::$tplVars['links']) {
				self::$tplFile = 'NoLinks';
			}
		}
	}
?>
