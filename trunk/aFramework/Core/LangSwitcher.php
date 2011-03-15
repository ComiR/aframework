<?php
	class LangSwitcher {
		public static function run () {
			self::setCurrentLang();
		}

		private static function setCurrentLang () {
			$requestedURI	= isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
			$allowedLangs	= explode(',', Config::get('lang.allowed_langs'));
			$currentLang	= Config::get('lang.default_lang');

			if (count($allowedLangs)) {
				$requestedURIPortions = explode('/', $requestedURI);

				# /en/about/ == 0 => '', 1 => 'en', 2 => 'about', 3 => ''
				if (in_array($requestedURIPortions[1], $allowedLangs)) {
					# If URI points to default lang, redirect it away
					if ($requestedURIPortions[1] == $currentLang) {
						redirect(str_replace('/' . $requestedURIPortions[1] . '/', '/', currPageURL()));
					}

					$currentLang = $requestedURIPortions[1];
				}
			}

			define('CURRENT_LANG', $currentLang);
		}

		# Buggy with lang-free requests (like CodeCompressor...)
		private static function rememberLang () {
			$preferredLang = isset($_COOKIE['preferred_lang']) ? $_COOKIE['preferred_lang'] : CURRENT_LANG;

			# Check if user has a preferred lang and that he's not trying to change it
			if ($preferredLang != CURRENT_LANG and !isset($_GET['set_lang'])) {
				if ($preferredLang == Config::get('lang.default_lang')) {
					redirect(WEBROOT);
				}
				else {
					redirect(WEBROOT . "/$preferredLang/");
				}
			}
			# See if user is changing lang
			elseif (isset($_GET['set_lang'])) {
				setcookie('preferred_lang', CURRENT_LANG, time() + 31536000, WEBROOT);
			}
		}
	}
?>
