<?php
	class AgnesEkman_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(Lang::get('Gallery'), Router::urlFor('Gallery'));
		}
	}
?>
