<?php
	class aDynAdmin_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (SU) {
				aFramework_DebugModule::addItem('aDynAdmin', Router::urlFor('DynAdmin'));
			}
		}
	}
?>
