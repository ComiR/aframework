<?php
	class BudhistorikSE_ObjectModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$id = Router::$params['objects_id'];
			self::$tplVars['object'] = Objects::getById($id);
		}
	}
?>
