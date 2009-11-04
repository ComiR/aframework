<?php
	class aCMS_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$pages = Pages::getPagesInNavigation();

			if ($pages) {
				foreach ($pages as $page) {
					aFramework_NavigationModule::addItem(array(
						'title'	=> $page['title'], 
						'url'	=> Router::urlFor('Page', $page)
					));
				}
			}

			if (ADMIN) {
				aFramework_NavigationModule::addItem(array(
					'title'	=> Lang::get('Add Page +'), 
					'url'	=> Router::urlFor('AddPage')
				));
			}
		}
	}
?>
