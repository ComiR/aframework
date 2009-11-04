<?php
	class aBlog_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(array(
				'title'	=> Lang::get('Archives'), 
				'url'	=> Router::urlFor('Archives')
			));

			if (ADMIN) {
				aFramework_NavigationModule::addItem(array(
					'title'	=> Lang::get('Add Article +'), 
					'url'	=> Router::urlFor('AddArticle')
				));
			}
		}
	}
?>
