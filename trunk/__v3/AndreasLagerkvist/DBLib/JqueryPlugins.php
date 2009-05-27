<?php
	class JqueryPlugins {
		private static $notMyPlugins = array(
			'jquery.easing.js', 
			'jquery.form.js', 
			'jquery.scrollTo.js', 
			'jquery.disableTextSelect.js', 
			'pixastic.custom.js', 

			'jquery.colourPicker.js', 
			'jquery.imageViewer.js'
		);

		public static function get () {
			$path		= DOCROOT . 'aFramework/Modules/Base/';
			$dh			= opendir($path);
			$plugins	= array();

			while ($f = readdir($dh)) {
				$matches = array();

				if (preg_match('/^jquery\.(.*?)\.js$/i', $f, $matches) and !in_array($matches[0], self::$notMyPlugins)) {
					$plugin = self::pluginAsArray($matches[1]);

					if ($plugin) {
						$plugins[] = $plugin;
					}
				}
			}

			return $plugins;
		}

		public static function getByUrlStr ($urlStr) {
			$bits	= explode('-', $urlStr);
			$plugin	= '';
			$i		= 0;

			foreach ($bits as $bit) {
				$plugin .= $i++ > 0 ? (in_array($bit, array('dl')) ? strtoupper($bit) : ucfirst($bit)) : $bit;
			}

			if (file_exists(DOCROOT . 'aFramework/Modules/Base/jquery.' . $plugin . '.js')) {
				return self::pluginAsArray($plugin);
			}

			return false;
		}

		private static function pluginAsArray ($plugin) {
			$path			= DOCROOT . 'aFramework/Modules/Base/jquery.' . $plugin . '.js';
			$contents		= file_get_contents($path);
			$matches		= array();
			$secondMatches	= array();
			$pluginArr		= array();
			$i				= 0;

			preg_match('/\/\*\*\*(.*?)\*\*\*\/(.*)?/is', $contents, $matches);

			if (!isset($matches[1])) {
				return false;
			}

			preg_match_all('/@(.*?):([^@]*)/is', $matches[1], $secondMatches);

			$pluginArr['name']		= $plugin;
			$pluginArr['file_name']	= "jquery.$plugin.js";
			$pluginArr['source']	= isset($matches[2]) ? trim($matches[2]) : '';

			foreach ($secondMatches[1] as $property) {
				$pluginArr[$property] = trim($secondMatches[2][$i++]);
			}

			return self::makeNice($pluginArr);
		}

		private static function makeNice ($row) {
			$row['name']				= htmlentities($row['name']);
			$row['file_name']			= htmlentities($row['file_name']);
			$row['source_code']			= NiceString::makeNice('[code]' . $row['source'] . '[/code]');
			$row['source_url']			= WEBROOT . 'aFramework/Modules/Base/' . $row['file_name'];

			$row['title']				= htmlentities($row['title']);
			$row['version']				= htmlentities($row['version']);

			$row['author']				= htmlentities($row['author']);

			$row['date']				= htmlentities($row['date']);
			$row['pub_date']			= date(Config::get('general.date_format'), strtotime($row['date']));

			$row['real_url']			= htmlentities($row['url']);
			$row['url_str']				= strtolower(ccFix($row['name'], '-'));
			$row['url']					= Router::urlFor('JqueryPlugin', array('url_str' => $row['url_str'])); # should pass entire $row

			$row['license']				= htmlentities($row['license']);
			$row['copyright']			= htmlentities($row['copyright']);

			$row['files']				= self::getPluginFiles('jquery.' . $row['name'] .'.js, ' .$row['requires']);
			$row['files']['csv_names']	= array();

			foreach ($row['files']['plugin'] as $f) {
				$row['files']['csv_names'][] = substr($f['url'], strlen(WEBROOT));
			}

			$row['files']['csv_names']	= implode(',', $row['files']['csv_names']);

			$row['does_short']			= NiceString::makeNice($row['does'], 4, false, 150);
			$row['does']				= NiceString::makeNice($row['does'], 4);
			$row['howto']				= NiceString::makeNice($row['howto'], 4);

			$row['example_html']		= $row['exampleHTML'];
			$row['example_html_code']	= NiceString::makeNice('[code]<div id="jquery-' .$row['url_str'] . "-example\">\n" .$row['example_html'] . "\n</div>[/code]");

			$row['example_js']			= $row['exampleJS'];
			$row['example_js_code']		= NiceString::makeNice('[code]' . $row['exampleJS'] . '[/code]');

			return $row;
		}

		private static function getPluginFiles ($requirements) {
			$reqs				= explode(',', $requirements);
			$pluginFiles		= array();
			$requirementFiles	= array();

			$requirementFiles[] = array(
				'name'	=> 'jQuery', 
				'url'	=> 'http://jquery.com', 
				'size'	=> false
			);

			foreach ($reqs as $req) {
				$req = trim($req);
				$ext = end(explode('.', $req));

				if ('css' == $ext and file_exists(DOCROOT . 'aFramework/Modules/Base/' . $req)) {
					$pluginFiles[] = array(
						'name'	=> $req, 
						'ext'	=> $ext, 
						'url'	=> WEBROOT . 'aFramework/Modules/Base/' . $req, 
						'size'	=> filesize(DOCROOT . 'aFramework/Modules/Base/' . $req)
					);
				}
				elseif (in_array($ext, array('png', 'gif', 'jpg')) and file_exists(DOCROOT . 'aFramework/Styles/gfx/' . $req)) {
					$pluginFiles[] = array(
						'name'	=> $req, 
						'ext'	=> $ext, 
						'img'	=> true, 
						'url'	=> WEBROOT . 'aFramework/Styles/gfx/' . $req
					);
				}
				elseif ('js' == $ext and file_exists(DOCROOT .'aFramework/Modules/Base/' . $req)) {
					#$jsp	= new JavaScriptPacker(file_get_contents(DOCROOT . 'aFramework/Modules/Base/' . $req));
					$psize	= true; # strlen($jsp->pack());

					$tmpPlugin = array(
						'name'	=> $req, 
						'ext'	=> 'js', 
						'url'	=> WEBROOT . 'aFramework/Modules/Base/' . $req, 
						'size'	=> filesize(DOCROOT . 'aFramework/Modules/Base/' . $req), 
						'psize'	=> $psize
					);

					if (in_array($req, self::$notMyPlugins)) {
						$requirementFiles[] = $tmpPlugin;
					}
					else {
						$pluginFiles[] = $tmpPlugin;
					}
				}
				elseif ('jquery' != strtolower($req)) {
					$requirementFiles[] = array(
						'name'	=> $req, 
						'ext'	=> $ext, 
						'url'	=> false, 
						'size'	=> false
					);
				}
			}

			return array('plugin' => $pluginFiles, 'requirements' => $requirementFiles);
		}
	}
?>