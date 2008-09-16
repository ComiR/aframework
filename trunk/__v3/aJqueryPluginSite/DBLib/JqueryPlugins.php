<?php
	class JqueryPlugins {
		private static $notMyPlugins = array(
			'dimensions', 
			'easing', 
			'form', 
			'ui-core', 
			'ui-draggable', 
			'ui-droppable', 
			'ui-droppable-1'
		);

		public static function get() {
			$path		= DOCROOT .'aFramework/Modules/Base/';
			$dh			= opendir($path);
			$plugins	= array();

			while($f = readdir($dh)) {
				$matches = array();

				if(preg_match('/^jquery\.(.*?)\.js$/i', $f, $matches) and !in_array($matches[1], self::$notMyPlugins)) {
					$plugin = self::pluginAsArray($matches[1]);

					if($plugin) {
						$plugins[] = $plugin;
					}
				}
			}

			return $plugins;
		}

		public static function getByUrlStr($urlStr) {
			$bits	= explode('-', $urlStr);
			$plugin	= '';

			foreach($bits as $bit) {
				$plugin .= ucfirst($bit);
			}

			if(file_exists(DOCROOT .'aFramework/Modules/Base/jquery.' .$plugin .'.js')) {
				return self::pluginAsArray($plugin);
			}

			return false;
		}

		private static function pluginAsArray($plugin) {
			$path			= DOCROOT .'aFramework/Modules/Base/jquery.' .$plugin .'.js';
			$contents		= file_get_contents($path);
			$matches		= array();
			$secondMatches	= array();
			$pluginArr		= array();
			$i				= 0;

			preg_match('/\/\*\*\*(.*?)\*\*\*\/(.*)?/is', $contents, $matches);

			if(!isset($matches[1])) {
				return false;
			}

			preg_match_all('/@(.*?):([^@]*)/is', $matches[1], $secondMatches);

			$pluginArr['name'] = $plugin;

			foreach($secondMatches[1] as $property) {
				$pluginArr[$property] = trim($secondMatches[2][$i++]);
			}

			return self::makeNice($pluginArr);
		}

		private static function makeNice($row) {
			$row['name']				= htmlentities($row['name']);
			$row['title']				= htmlentities($row['title']);
			$row['version']				= htmlentities($row['version']);
			$row['author']				= htmlentities($row['author']);
			$row['date']				= htmlentities($row['date']);
			$row['pub_date']			= htmlentities($row['date']);
			$row['real_url']			= htmlentities($row['url']);
			$row['url_str']				= strtolower(ccFix($row['name'], '-'));
			$row['url']					= Router::urlFor('JqueryPlugin', array('url_str' => $row['url_str']));
			$row['license']				= htmlentities($row['license']);
			$row['copyright']			= htmlentities($row['copyright']);
			$row['requires']			= htmlentities($row['requires']); // TODO: should include links to all required files
			$row['does']				= htmlentities($row['does']); // TODO: should be nice-string:ed
			$row['usage']				= htmlentities($row['usage']); // TODO: should be nice-string:ed
			$row['example_html']		= '<div id="jquery-' .$row['url_str'] .'-example">' .$row['exampleHTML'] .'</div>';
			$row['example_html_code']	= htmlentities($row['example_html']);
			$row['example_js']			= "<script type=\"text/javascript\">window.addEventListener('load', function() {\n" .$row['exampleJS'] ."\n}, false);</script>";
			$row['example_js_code']		= htmlentities($row['example_js']);

			return $row;
		}
	}
?>