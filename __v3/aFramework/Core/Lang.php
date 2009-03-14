<?php
	Class Lang {
		private static $lang = false;

		public static function get ($str, $l = false) {
			if ($l === false) {
				$l = Config::get('general.lang');
			}
			if (self::$lang === false) {
				self::loadLang();
			}

			return isset(self::$lang[$l][$str]) ? self::$lang[$l][$str] : "[$str]";
		}

		public static function getLang () {
			return self::$lang;
		}

		private static function loadLang () {
			$sites = explode(' ', SITE_HIERARCHY);

			foreach ($sites as $site) {
				$path = DOCROOT . $site . '/Lang/';

				if (is_dir($path)) {
					$dh		= opendir($path);
					$lang	= array();

					while ($f = readdir($dh)) {
						if ('php' == end(explode('.', $f))) {
							$lang[substr($f, 0, -4)] = include $path . $f;
						}
					}

					self::$lang = array_merge((array)$lang, (array)self::$lang);
				}
			}
		}
	}
?>