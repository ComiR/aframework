<?php
	class aFramework_IntroTextModule extends Module {
		public static function run() {
			if(!isset(self::$tplVars['heading'])) {
				self::$tplVars['heading'] = 'Hey you';
			}
		}
	}
?>