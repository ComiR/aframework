<?php
	class aBlog_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_DebugModule::addItem(Lang::get('Add Article +'), Router::urlFor('AddArticle'));
		}
	}
?>
