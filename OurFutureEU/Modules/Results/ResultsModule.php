<?php
	class OurFutureEU_ResultsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$results = self::getResults(Router::urlForFile('results/', 'OurFutureEU', DOCROOT), Router::urlForFile('results/', 'OurFutureEU', WEBROOT));

			self::$tplVars['results'] = self::renderResults($results);
		}

		private static function getResults ($docDir, $webDir) {
			$dh = opendir($docDir);
			$results = array();

			while ($file = readdir($dh)) {
				if (!in_array($file, array('..', '.'))) {
					if (is_file("$docDir/$file")) {
						$ext = end(explode('.', $file));

						$results["$docDir/$file"] = array(
							'name'	=> $file, 
							'ext'	=> $ext, 
							'title'	=> substr(ucwords(str_replace(array('-', '_'), ' ', $file)), 0, -(strlen($ext) + 1)), 
							'size'	=> filesize("$docDir/$file"), 
							'dir'	=> "$docDir/$file", 
							'path'	=> "$webDir/$file"
						);
					}
					elseif (is_dir("$docDir/$file")) {
						$results["$docDir/$file"] = self::getResults("$docDir/$file", "$webDir/$file");
					}
				}
			}

			return $results;
		}

		private static function renderResults ($results) {
			$html = '<ul>';

			foreach ($results as $file => $result) {
				if (!isset($result['name'])) {
					$html .= '<li class="dir">' . basename($file) . self::renderResults($result) . '</li>';
				}
				else {
					$html .= '<li><a href="' . $result['path'] . '">' . $result['name'] . '</a> <small>(' . round($result['size'] / 1024) . 'kb)</small></li>';
				}
			}

			$html .= '</ul>';

			return $html;
		}
	}
?>
