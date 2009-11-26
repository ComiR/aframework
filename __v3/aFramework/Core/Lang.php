<?php
	Class Lang {
		private static $lang = false;
		private static $lcs = array(
			'en'	=> 'English', 
			'se'	=> 'Svenska'
		);

		public static function get ($str) {
			# Load every language for every site if not already loaded
			if (self::$lang === false) {
				self::loadLang();
			}

			# If the string exists in the CURRENT_LANG use that
			if (isset(self::$lang[CURRENT_LANG][$str])) {
				return self::$lang[CURRENT_LANG][$str];
			}
			# Else, try default lang
			elseif (isset(self::$lang[Config::get('general.default_lang')][$str])) {
				return self::$lang[Config::get('general.default_lang')][$str];
			}
			# Else, just return the string
			else {
				return $str;
			}
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
						$lc = substr($f, 0, -4);

						if ('php' == end(explode('.', $f))) {
							self::$lang[$lc] = array_merge((array)include $path . $f, (array)self::$lang[$lc]);
						}
					}
				}
			}
		}

		public static function lcToName ($lc) {
			return isset(self::$lcs[$lc]) ? self::$lcs[$lc] : $lc;
		}
	}
?>
