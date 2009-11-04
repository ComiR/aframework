<?php
	class Styles {
		public static function get () {
			$styles = array();

			# Get all the style-names for the current (top-most) site
			$currentSitesStyleNames = self::getCurrentSitesStyleNames();

			# Now get all style-data for each of those styles
			foreach ($currentSitesStyleNames as $style) {
				$data = self::getStyleData($style);

				if ($data) {
					$styles[] = $data;
				}
			}

			return $styles;
		}

		private static function getStyleData ($style) {
			$sites	= explode(' ', SITE_HIERARCHY);
			$data	= false;

			foreach ($sites as $site) {
				$path = DOCROOT . $site . '/Styles/' . $style . '/style.css';

				if (file_exists($path)) {
					$contents = file_get_contents($path);

					if (preg_match('/\/\*\*\*(.*?)\*\*\*/s', $contents, $matches)) {
						preg_match_all('/@(.*?):([^@]*)/is', $matches[1], $secondMatches);

						$data	= array('name' => $style, 'site' => $site);
						$i		= 0;

						foreach ($secondMatches[1] as $property) {
							$data[$property] = trim($secondMatches[2][$i++]);
						}

						foreach (array('jpg', 'png', 'gif') as $ext) {
							if (file_exists(DOCROOT . $site . '/Styles/' . $style . '/thumb.' . $ext)) {
								$data['thumb'] = WEBROOT . $site . '/Styles/' . $style . '/thumb.' . $ext;

								break;
							}
						}

						break;
					}
				}
			}

			return $data;
		}

		private static function getCurrentSitesStyleNames () {
			$path	= CURRENT_SITE_DIR . 'Styles/';
			$dh		= opendir($path);
			$styles	= array();

			while ($file = readdir($dh)) {
				if ('.' != substr($file, 0, 1) and is_dir($path . $file)) {
					$styles[] = $file;
				}
			}

			return $styles;
		}
	}
?>
