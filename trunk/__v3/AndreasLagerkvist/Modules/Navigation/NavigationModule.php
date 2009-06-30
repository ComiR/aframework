<?php
	class AndreasLagerkvist_NavigationModule extends aCMS_NavigationModule {
		public static function run () {
			parent::run();

			$navItems	= array();
			$navItems[]	= self::$tplVars['nav_items'][0];

			unset(self::$tplVars['nav_items'][0]);

			$navItems[] = array(
				'title'	=> Lang::get('Archives'), 
				'url'	=> Router::urlFor('Archives')
			);
			$navItems[] = array(
				'title'	=> Lang::get('jQuery'), 
				'url'	=> Router::urlFor('JqueryPlugins')
			);

			self::$tplVars['nav_items'] = array_merge($navItems, self::$tplVars['nav_items']);

			self::setSelectedNavigationItem();
		}
	}
?>