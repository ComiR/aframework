<?php
	error_reporting(E_ALL);
	ini_set('display_errors', true);

	define('DOCROOT', realpath(dirname( __FILE__ ) . '/../..') . '/');

	class LangGenerator {
		public static function run ($site = 'aFramework') {
			$path = DOCROOT . str_replace(array('..', '.', '/', '\\'), '', $site);

			$langs = self::getLangsInDir($path);

			return $langs;
		}

		private static function getLangsInDir ($dir) {
			$langs = array();

			if (is_dir($dir)) {
				$dh = opendir($dir);

				while ($f = readdir($dh)) {
					if ($f != '..' and $f != '.') {
						if (is_dir($dir . '/' . $f)) {
							$newLangs = self::getLangsInDir($dir . '/' . $f);
							$langs = $newLangs !== false ? array_merge($langs, $newLangs) : $langs;
						}
						else {
							$ext = end(explode('.', $f));

							if (in_array($ext, array('js', 'php'))) {
								$matches = array();

								if (preg_match_all('/Lang(::|\.)get\(\'(.*?)\'.*?\)/', file_get_contents($dir . '/' . $f), $matches)) {
									foreach ($matches[2] as $key) {
										$langs[$f][$key] = ucfirst(str_replace('_', ' ', $key));
									}
								}
							}
						}
					}
				}

				return $langs;
			}

			return false;
		}
	}

	$langs	= LangGenerator::run(isset($_GET['site']) ? $_GET['site'] : 'aFramework');
	$code	= "<?php return array(\n";

	foreach ($langs as $site => $ls) {
		$code .= "\n# $site\n";

		foreach ($ls as $k => $v) {
			$code .= "'$k' => '$v', \n";
		}
	}

	echo substr($code, 0, -3) . "\n\n); ?>"; 
?>