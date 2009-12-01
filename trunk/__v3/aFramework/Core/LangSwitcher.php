<?php
	class LangSwitcher {
		public static function run () {
			$requestedURI	= isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
			$allowedLangs	= explode(',', Config::get('general.allowed_langs'));
			$currentLang	= Config::get('general.default_lang');

			if (count($allowedLangs)) {
				$requestedURIPortions = explode('/', $requestedURI);

				# /en/about/ == 0 => '', 1 => 'en', 2 => 'about', 3 => ''
				if (in_array($requestedURIPortions[1], $allowedLangs)) {
					# If URI points to default lang, redirect it away
					if ($requestedURIPortions[1] == $currentLang) {
						redirect(str_replace('/' . $requestedURIPortions[1] . '/', '/', currPageURL()));
					}

					$currentLang = $requestedURIPortions[1];

					# Remove the lang from the requestedURI so as not to affect routing
					$requestedURI = str_replace('/' . $currentLang . '/', '/', $requestedURI);
				}
			}

			define('CURRENT_LANG', $currentLang);
		}
	}
?>
