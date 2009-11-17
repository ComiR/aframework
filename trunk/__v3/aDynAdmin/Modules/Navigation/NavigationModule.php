<?php
	class aDynAdmin_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (ADMIN) {
				aFramework_NavigationModule::addItem(array(
					'title'	=> 'aDynAdmin', 
					'url'	=> Router::urlFor('DynAdmin')
				));
			}
		}
	}
?>
