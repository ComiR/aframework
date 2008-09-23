<?php
	class aFramework_JSPackerModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_GET['file'])) {
				$path = removeDots($_GET['file']);
				$path = str_replace(array('///', '//'), '/', $_SERVER['DOCUMENT_ROOT'] .'/' .$path);

				if(file_exists($path) and 'js' == end(explode('.', $path))) {
					$jsp = new JavaScriptPacker(file_get_contents($path));

					header('Content-type: application/x-javascript');

					self::$tplVars['js'] = $jsp->pack();
				}
			}
		}
	}
?>