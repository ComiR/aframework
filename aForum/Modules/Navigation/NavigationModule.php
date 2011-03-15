<?php
	class aForum_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(Lang::get('Forums'), Router::urlFor('Forums'));
		}
	}
?>
