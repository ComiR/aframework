<?php
	class aDynAdmin_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			aFramework_DebugModule::addItem('aDynAdmin', Router::urlFor('DynAdmin'));
		}
	}
?>
