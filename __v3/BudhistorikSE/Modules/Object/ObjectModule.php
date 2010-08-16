<?php
	class BudhistorikSE_ObjectModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['object'] = Objects::getById(Router::$params['objects_id']);
		}
	}
?>
