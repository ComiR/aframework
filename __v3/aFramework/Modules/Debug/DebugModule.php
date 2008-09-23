<?php
	class aFramework_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(!(DEBUG and ADMIN)) {
				self::$tplFile = false;
			}

			self::$tplVars['routes'] = Router::getRoutes();
		}
	}
?>