<?php
	class aCMS_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			$navItems[]	= array(
				'title'	=> 'Home', 
				'url'	=> Router::urlFor('Home')
			);
			$pages		= Pages::getPagesInNavigation();

			if($pages) {
				$navItems = array_merge($navItems, $pages);
			}

			self::$tplVars['nav_items'] = $navItems;

			if(ADMIN) {
				self::$tplVars['nav_items'][] = array(
					'title'	=> 'Add page +', 
					'url' => Router::urlFor('AddPage')
				);
			}
		}
	}
?>