<?php
	class aCMS_NavigationModule extends aFramework_NavigationModule {
		public static function run () {
			parent::run();

			$pages = Pages::getPagesInNavigation();

			if ($pages) {
				foreach ($pages as $page) {
					self::addItem(array(
						'title'	=> $page['title'], 
						'url'	=> Router::urlFor('Page', $page)
					));
				}
			}

			if (ADMIN) {
				self::addItem(array(
					'title'	=> Lang::get('Add Page'), 
					'url'	=> Router::urlFor('AddPage')
				));
			}

			self::setSelectedNavigationItem();
		}
	}
?>
