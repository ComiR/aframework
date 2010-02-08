<?php
	Class Lang {
		private static $lang = false;
		private static $lc2cc = array(
			'sv' => 'se', 
			'en' => 'gb'
		);
		private static $lcs = array(
			'aa' => 'Afar',
			'ab' => 'Abkhazian',
			'ae' => 'Avestan',
			'af' => 'Afrikaans',
			'ak' => 'Akan',
			'am' => 'Amharic',
			'an' => 'Aragonese',
			'ar' => 'Arabic',
			'as' => 'Assamese',
			'av' => 'Avaric',
			'ay' => 'Aymara',
			'az' => 'Azerbaijani',
			'ba' => 'Bashkir',
			'be' => 'Belarusian',
			'bg' => 'Bulgarian',
			'bh' => 'Bihari',
			'bi' => 'Bislama',
			'bm' => 'Bambara',
			'bn' => 'Bengali',
			'bo' => 'Tibetan',
			'br' => 'Breton',
			'bs' => 'Bosnian',
			'ca' => 'Catalan',
			'ce' => 'Chechen',
			'ch' => 'Chamorro',
			'co' => 'Corsican',
			'cr' => 'Cree',
			'cs' => 'Czech',
			'cu' => 'Church Slavic',
			'cv' => 'Chuvash',
			'cy' => 'Welsh',
			'da' => 'Danish',
			'de' => 'German',
			'dv' => 'Divehi',
			'dz' => 'Dzongkha',
			'ee' => 'Ewe',
			'el' => 'Greek',
			'en' => 'English',
			'eo' => 'Esperanto',
			'es' => 'Spanish',
			'et' => 'Estonian',
			'eu' => 'Basque',
			'fa' => 'Persian',
			'ff' => 'Fulah',
			'fi' => 'Finnish',
			'fj' => 'Fijian',
			'fo' => 'Faroese',
			'fr' => 'French',
			'fy' => 'Western Frisian',
			'ga' => 'Irish',
			'gd' => 'Scottish Gaelic',
			'gl' => 'Galician',
			'gn' => 'Guarani',
			'gu' => 'Gujarati',
			'gv' => 'Manx',
			'ha' => 'Hausa',
			'he' => 'Hebrew',
			'hi' => 'Hindi',
			'ho' => 'Hiri Motu',
			'hr' => 'Croatian',
			'ht' => 'Haitian',
			'hu' => 'Hungarian',
			'hy' => 'Armenian',
			'hz' => 'Herero',
			'ia' => 'Interlingua (International Auxiliary Language Association)',
			'id' => 'Indonesian',
			'ie' => 'Interlingue',
			'ig' => 'Igbo',
			'ii' => 'Sichuan Yi',
			'ik' => 'Inupiaq',
			'io' => 'Ido',
			'is' => 'Icelandic',
			'it' => 'Italian',
			'iu' => 'Inuktitut',
			'ja' => 'Japanese',
			'jv' => 'Javanese',
			'ka' => 'Georgian',
			'kg' => 'Kongo',
			'ki' => 'Kikuyu',
			'kj' => 'Kwanyama',
			'kk' => 'Kazakh',
			'kl' => 'Kalaallisut',
			'km' => 'Khmer',
			'kn' => 'Kannada',
			'ko' => 'Korean',
			'kr' => 'Kanuri',
			'ks' => 'Kashmiri',
			'ku' => 'Kurdish',
			'kv' => 'Komi',
			'kw' => 'Cornish',
			'ky' => 'Kirghiz',
			'la' => 'Latin',
			'lb' => 'Luxembourgish',
			'lg' => 'Ganda',
			'li' => 'Limburgish',
			'ln' => 'Lingala',
			'lo' => 'Lao',
			'lt' => 'Lithuanian',
			'lu' => 'Luba-Katanga',
			'lv' => 'Latvian',
			'mg' => 'Malagasy',
			'mh' => 'Marshallese',
			'mi' => 'Maori',
			'mk' => 'Macedonian',
			'ml' => 'Malayalam',
			'mn' => 'Mongolian',
			'mr' => 'Marathi',
			'ms' => 'Malay',
			'mt' => 'Maltese',
			'my' => 'Burmese',
			'na' => 'Nauru',
			'nb' => 'Norwegian Bokmal',
			'nd' => 'North Ndebele',
			'ne' => 'Nepali',
			'ng' => 'Ndonga',
			'nl' => 'Dutch',
			'nn' => 'Norwegian Nynorsk',
			'no' => 'Norwegian',
			'nr' => 'South Ndebele',
			'nv' => 'Navajo',
			'ny' => 'Chichewa',
			'oc' => 'Occitan',
			'oj' => 'Ojibwa',
			'om' => 'Oromo',
			'or' => 'Oriya',
			'os' => 'Ossetian',
			'pa' => 'Panjabi',
			'pi' => 'Pali',
			'pl' => 'Polish',
			'ps' => 'Pashto',
			'pt' => 'Portuguese',
			'qu' => 'Quechua',
			'rm' => 'Raeto-Romance',
			'rn' => 'Kirundi',
			'ro' => 'Romanian',
			'ru' => 'Russian',
			'rw' => 'Kinyarwanda',
			'sa' => 'Sanskrit',
			'sc' => 'Sardinian',
			'sd' => 'Sindhi',
			'se' => 'Northern Sami',
			'sg' => 'Sango',
			'si' => 'Sinhala',
			'sk' => 'Slovak',
			'sl' => 'Slovenian',
			'sm' => 'Samoan',
			'sn' => 'Shona',
			'so' => 'Somali',
			'sq' => 'Albanian',
			'sr' => 'Serbian',
			'ss' => 'Swati',
			'st' => 'Southern Sotho',
			'su' => 'Sundanese',
			'sv' => 'Swedish',
			'sw' => 'Swahili',
			'ta' => 'Tamil',
			'te' => 'Telugu',
			'tg' => 'Tajik',
			'th' => 'Thai',
			'ti' => 'Tigrinya',
			'tk' => 'Turkmen',
			'tl' => 'Tagalog',
			'tn' => 'Tswana',
			'to' => 'Tonga',
			'tr' => 'Turkish',
			'ts' => 'Tsonga',
			'tt' => 'Tatar',
			'tw' => 'Twi',
			'ty' => 'Tahitian',
			'ug' => 'Uighur',
			'uk' => 'Ukrainian',
			'ur' => 'Urdu',
			'uz' => 'Uzbek',
			've' => 'Venda',
			'vi' => 'Vietnamese',
			'vo' => 'Volapuk',
			'wa' => 'Walloon',
			'wo' => 'Wolof',
			'xh' => 'Xhosa',
			'yi' => 'Yiddish',
			'yo' => 'Yoruba',
			'za' => 'Zhuang',
			'zh' => 'Chinese',
			'zu' => 'Zulu'
		);

		public static function get ($str) {
			# Load every language for every site if not already loaded
			if (self::$lang === false) {
				self::loadLang();
			}

			# If the string exists in the CURRENT_LANG use that
			if (isset(self::$lang[CURRENT_LANG][$str])) {
				return escHTML(self::$lang[CURRENT_LANG][$str]);
			}
			# Else, try default lang
			elseif (isset(self::$lang[Config::get('lang.default_lang')][$str])) {
				return escHTML(self::$lang[Config::get('lang.default_lang')][$str]);
			}
			# Else, just return the string
			else {
				return escHTML($str);
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
							if (!isset(self::$lang[$lc])) {
								self::$lang[$lc] = array();
							}

							self::$lang[$lc] = array_merge((array)include $path . $f, (array)self::$lang[$lc]);
						}
					}
				}
			}
		}

		public static function lcToName ($lc) {
			return isset(self::$lcs[$lc]) ? self::$lcs[$lc] : $lc;
		}

		public static function lc2cc ($lc) {
			return isset(self::$lc2cc[$lc]) ? self::$lc2cc[$lc] : $lc;
		}

		public static function getJSLangCode () {
			$langs	= self::getLang();
			$code	= "Lang = {};\nLang.lang = {\n";
			$sites	= explode(' ', SITE_HIERARCHY);
			$jsLang	= array();

			# Get the lang used in .js-files
			foreach ($sites as $site) {
				$jsLangsForSite	= self::getLangsInDir(DOCROOT . $site, array('js'));
				$jsLang			= $jsLangsForSite ? array_merge($jsLang, $jsLangsForSite) : $jsLang;
			}

			foreach ($jsLang as $file => $strs) {
				foreach ($strs as $str) {
					$tmp[$str] = $str;
				}
			}

			$jsLang = $tmp;

			# Loop through all lang in the lang-files
			foreach ($langs as $lc => $translations) {
				$numJSLangs = 0;
				$code .= "\t'$lc': {\n";

				foreach ($translations as $k => $v) {
					# Only include the ones that are used in the .js-files
					if (isset($jsLang[$k])) {
						$code .= "\t\t'$k': '$v', \n";
						$numJSLangs++;
					}
				}

				if ($numJSLangs) {
					$code = substr($code, 0, -3);
				}

				$code .= "\n\t}, \n";
			}

			$code = substr($code, 0, -3) . "\n};";

			return $code;
		}

		public static function getLangsInDir ($dir, $validExts = array('js', 'php')) {
			$langs = array();

			if (is_dir($dir)) {
				$dh = opendir($dir);

				while ($f = readdir($dh)) {
					if ($f != '..' and $f != '.') {
						if (is_dir($dir . '/' . $f)) {
							$newLangs = self::getLangsInDir($dir . '/' . $f, $validExts);
							$langs = $newLangs !== false ? array_merge($langs, $newLangs) : $langs;
						}
						else {
							$ext = end(explode('.', $f));

							if (in_array($ext, $validExts)) {
								$pattern	= '/Lang(::|\.)get\(\'(.*?)\'(.*?)\)/';
								$matches	= array();
								$contents	= file_get_contents($dir . '/' . $f);

								if (preg_match_all($pattern, $contents, $matches)) {
									foreach ($matches[2] as $key) {
										$langs[$f][$key] = $key; # ucfirst(str_replace('_', ' ', $key));
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
