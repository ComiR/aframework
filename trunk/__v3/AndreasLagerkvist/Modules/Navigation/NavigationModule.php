<?php
	class AndreasLagerkvist_NavigationModule extends aCMS_NavigationModule {
		public static function run () {
			parent::run();

			self::addItem(array(
				'title'	=> Lang::get('Archives'), 
				'url'	=> Router::urlFor('Archives')
			), 1);

			self::addItem(array(
				'title'	=> Lang::get('jQuery'), 
				'url'	=> Router::urlFor('JqueryPlugins')
			), 2);

			self::setSelectedNavigationItem();
		}
	}
?>
