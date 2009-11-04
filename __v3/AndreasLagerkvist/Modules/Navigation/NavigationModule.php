<?php
	class AndreasLagerkvist_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(array(
				'title'	=> Lang::get('jQuery'), 
				'url'	=> Router::urlFor('JqueryPlugins')
			), 2);
		}
	}
?>
