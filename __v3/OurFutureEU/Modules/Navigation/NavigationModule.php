<?php
	class OurFutureEU_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(array(
				'title'	=> Lang::get('News'), 
				'url'	=> Router::urlFor('ArticlesByTag', array('url_str' => Lang::get('url.news-tag')))
			));
		}
	}
?>
