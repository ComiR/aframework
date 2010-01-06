<?php
	class aBlog_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (Config::get('navigation.archives')) {
				aFramework_NavigationModule::addItem(Lang::get('Archives'), Router::urlFor('Archives'));
			}
		}
	}
?>
