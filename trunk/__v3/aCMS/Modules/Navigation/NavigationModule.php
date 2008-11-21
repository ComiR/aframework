<?php
	class aCMS_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			self::getHomePage();
			self::getPagesInNavigation();
			if(ADMIN) {
				self::getAdminLinks();
			}
			self::setSelectedNavigationItem();
		}

		protected function setSelectedNavigationItem() {
			$url			= $_SERVER['REQUEST_URI'];
			$tmpSelected	= array('url' => '', 'selected' => false);
			$numItems		= count(self::$tplVars['nav_items']);

			for($i = 0; $i < $numItems; $i++) {
				self::$tplVars['nav_items'][$i]['selected'] = false;

				if(strpos($url, self::$tplVars['nav_items'][$i]['url']) === 0 and strlen($tmpSelected['url']) < strlen(self::$tplVars['nav_items'][$i]['url'])) {
					$tmpSelected['selected'] = false;

					self::$tplVars['nav_items'][$i]['selected'] = true;

					$tmpSelected = &self::$tplVars['nav_items'][$i];
				}
			}
		}

		protected static function getHomePage() {
			self::$tplVars['nav_items'][] = array(
				'title'	=> 'Home', 
				'url'	=> Router::urlFor('Home')
			);
		}

		protected static function getAdminNavigation() {
			self::$tplVars['nav_items'][] = array(
				'title'	=> 'Add page +', 
				'url' => Router::urlFor('AddPage')
			);
		}

		protected static function getPagesInNavigation() {
			$pages		= Pages::getPagesInNavigation();

			if($pages) {
				self::$tplVars['nav_items'] = array_merge(self::$tplVars['nav_items'], $pages);
			}
		}
	}
?>