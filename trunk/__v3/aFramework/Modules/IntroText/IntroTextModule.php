<?php
	class aFramework_IntroTextModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			if(!isset(self::$tplVars['heading'])) {
				self::$tplVars['heading'] = 'Hey you';
			}
		}
	}
?>