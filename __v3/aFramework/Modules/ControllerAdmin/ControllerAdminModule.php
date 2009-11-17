<?php
	class aFramework_ControllerAdminModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplFile = ADMIN ? true : false;

			if (isset($_GET['controller_admin'])) {
				$_SESSION['controller_admin'] = true;
			}
			elseif (isset($_GET['no_controller_admin'])) {
				unset($_SESSION['controller_admin']);
			}
		}
	}
?>
