<?php
	class aCMS_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_DebugModule::addItem(Lang::get('Add Page +'), Router::urlFor('AddPage'));
		}
	}
?>
