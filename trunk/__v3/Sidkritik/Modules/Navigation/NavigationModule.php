<?php
	class Sidkritik_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(Lang::get('All Sites'), Router::urlFor('Sites'));
			aFramework_NavigationModule::addItem(Lang::get('Add a Site'), Router::urlFor('AddSite'));
		}
	}
?>
