<?php
	class aCMS_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$pages = Pages::getPagesInNavigation();

			if ($pages) {
				foreach ($pages as $page) {
					aFramework_NavigationModule::addItem($page['title'], Router::urlFor('Page', $page));
				}
			}
		}
	}
?>
