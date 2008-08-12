<?php
	class aCMS_NavigationModule extends Module {
		public static function run() {
			self::$tplVars['nav_items'] = Pages::getPagesInNavigation();
		}
	}
?>