<?php
	class OurFutureEU_NavigationModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_NavigationModule::addItem(Lang::get('News'), Router::urlFor('ArticlesByTag', array('url_str' => Lang::get('url.news-tag'))));
		}
	}
?>
