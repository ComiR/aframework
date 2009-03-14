<?php
	class aFramework_IntroTextModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!isset(self::$tplVars['heading'])) {
				self::$tplVars['heading'] = 'Hey you';
			}
		}
	}
?>