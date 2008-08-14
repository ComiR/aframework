<?php
	class aCMS_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			$pages		= Pages::getPagesInNavigation();
			$navItems	= array(
				0 => array(
					'title'	=> 'Home', 
					'url'	=> Router::urlFor('Home')
				)
			);

			if($pages) {
				$navItems = array_merge($navItems, $pages);
			}

			self::$tplVars['nav_items'] = $navItems;
		}
	}
?>