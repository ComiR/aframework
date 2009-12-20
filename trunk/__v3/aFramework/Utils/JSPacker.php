<?php
	require_once '../Lib/JavaScriptPacker.php';

	if (isset($_GET['file'])) {
		echo JSPacker::run($_GET['file']);
	}
	else {
		echo 'Error: Please specify an input file (?file=)';
	}

	class JSPacker {
		public static function run ($file) {
			# 2 dirs up is root (we're in /aFramework/Utils/)
			$path = '../../' . str_replace(array('../', '..\\'), '', $file);

			if (file_exists($path) and 'js' == end(explode('.', $path))) {
				header('Content-type: application/x-javascript');

				$js		= file_get_contents($path);
				$jsp	= new JavaScriptPacker($js, 0);

				return $jsp->pack();
			}
			else {
				die("$path does not exist");
			}
		}
	}
?>
