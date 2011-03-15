<?php
	class BudhistorikSE_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem('Mäklarkontor', Router::urlFor('Offices'));
			aFramework_NavigationModule::addItem('Mäklare', Router::urlFor('Users'));
			aFramework_NavigationModule::addItem('Objekt', Router::urlFor('Objects'));

			if (!USER) {
				aFramework_NavigationModule::addItem('Logga in', Router::urlFor('UserLogin'));
			}
			else {
				aFramework_NavigationModule::addItem('Mitt konto', Router::urlFor('UserObjectsAdmin'));
				aFramework_NavigationModule::addItem('Logga ut', Router::urlFor('UserLogin') . '?logout');
			}
		}
	}
?>
