<?php
	class BudhistorikSE_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem('Mäklarkontor', Router::urlFor('Offices'));
			aFramework_NavigationModule::addItem('Mäklare', Router::urlFor('Users'));
			aFramework_NavigationModule::addItem('Objekt', Router::urlFor('Objects'));
			aFramework_NavigationModule::addItem('Logga in', Router::urlFor('UserLogin'));
		}
	}
?>
