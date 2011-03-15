<?php
	class BudhistorikSE_ObjectBidsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['bids'] = Bids::getByObjectsID(Router::$params['objects_id']);
		}
	}
?>
