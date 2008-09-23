<?php
	class aFramework_JSPackerModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			if(isset($_GET['file'])) {
				$path = str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/' .$_GET['file']);

				if(file_exists($path)) {
					$jsp = new JavaScriptPacker(file_get_contents($path));

					header('Content-type: application/x-javascript');

					self::$tplVars['js'] = $jsp->pack();
				}
			}
		}
	}
?>