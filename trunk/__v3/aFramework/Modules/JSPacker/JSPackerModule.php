<?php
	class aFramework_JSPackerModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['file'])) {
				$path = str_replace(array('///', '//'), '/', $_SERVER['DOCUMENT_ROOT'] . '/' . basename($_GET['file']));

				if (file_exists($path) and 'js' == end(explode('.', $path))) {
					$jsp = new JavaScriptPacker(file_get_contents($path), 0);

					header('Content-type: application/x-javascript');

					self::$tplVars['js'] = $jsp->pack();
				}
			}
		}
	}
?>