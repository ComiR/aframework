<?php
	class aFramework_LangGeneratorModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$site					= isset($_GET['site']) ? $_GET['site'] : 'aFramework';
			$path					= DOCROOT . str_replace(array('..', '.', '/', '\\'), '', $site);
			self::$tplVars['langs']	= self::getLangsInDir($path);
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
?>