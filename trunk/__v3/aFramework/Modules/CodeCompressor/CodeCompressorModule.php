<?php
	class aFramework_CodeCompressorModule {
		public static $tplVars = array();
		public static $tplFile = true;

		protected static $type;
		protected static $exclude = array();

		private static $mimeTypes = array(
			'css'	=> 'text/css', 
			'js'	=> 'application/x-javascript'
		);

		public static function run () {
			self::$type		= (isset($_GET['t']) and array_key_exists($_GET['t'], self::$mimeTypes)) ? $_GET['t'] : 'css';
			header('Content-type: ' . self::$mimeTypes[self::$type]);

			$cacheTime		= ADMIN ? 0 : 0; # 3600
			$style			= removeDots(@$_GET['s']);
			$cachePath		= DOCROOT . 'aFramework/Cache/' . CURRENT_SITE . '_' . $style . '.' . self::$type;
			$cacheExists	= file_exists($cachePath);
			$cacheModified	= $cacheExists ? filemtime($cachePath) : 0;

			# If the requested style exists in the current site's Style-dir
			# it's considered a valid style.
			if (self::$type == 'css' and !is_dir(CURRENT_SITE_DIR . 'Styles/' . $style . '/')) {
				return false;
			}

			# If the cache is younger than $cacheTime just load it directly and return
			if ((time() - $cacheModified) < $cacheTime) {
				self::$tplVars['code'] = file_get_contents($cachePath);

				return true;
			}

			# Get the highest last modified date of all the files in all
			# the dirs and see if cache is younger than all of them
			$fileLastModified = self::getLastModifiedFile($style);

			if ($cacheModified >= $fileLastModified) {
				self::$tplVars['code'] = file_get_contents($cachePath);
			}
			# No cache or old, generate new
			else {
				# Get all the code in all the dirs of all the sites
				$code = self::getAllCodeInAllDirsOfAllSites($style);

				# JS gets packed
				if (self::$type == 'js') {
					$code .= self::getJSLangCode();
				#	$jsPacker = new JavaScriptPacker($code, 0);
				#	$code = $jsPacker->pack();
				}
				# CSS gets constant-treatment
				elseif (self::$type == 'css') {
					$code = CSSConstants::compile($code);
				}

				# Assign code to template
				self::$tplVars['code'] = $code;

				# Also create a cache
				file_put_contents($cachePath, $code);
			}
		}

		/**
		 * getLastModifiedFile
		 *
		 * Gets the last modified file
		 */
		private static function getLastModifiedFile ($style) {
			$sites				= explode(' ', SITE_HIERARCHY);
			$fileLastModified	= 0;
			$dirs				= array();

			foreach ($sites as $site) {
				$dirs[] = DOCROOT . $site . '/Styles/' . $style . '/';
				$dirs[] = DOCROOT . $site . '/Styles/' . $style . '/controllers/';
				$dirs[] = DOCROOT . $site . '/Styles/' . $style . '/modules/';
				$path	= DOCROOT . $site . '/Modules/';

				if (is_dir($path)) {
					$dh = opendir($path);

					while ($f = readdir($dh)) {
						if ('.' != $f and '..' != $f and is_dir(DOCROOT . $site . '/Modules/' . $f . '/')) {
							$dirs[] = DOCROOT . $site . '/Modules/' . $f . '/';
						}
					}
				}
			}

			foreach ($dirs as $dir) {
				$flm = 0;

				if (is_dir($dir)) {
					$dh = opendir($dir);

					while ($f = readdir($dh)) {
						if (self::$type == end(explode('.', $f))) {
							$tmpFlm = filemtime($dir .$f);

							if ($tmpFlm > $flm) {
								$flm = $tmpFlm;
							}
						}
					}
				}

				if ($flm > $fileLastModified) {
					$fileLastModified = $flm;
				}
			}

			return $fileLastModified;
		}

		/**
		 * getAllCodeInAllDirsOfAllSites
		 *
		 * Does what it's called; gets all code in all possible directories
		 */
		private static function getAllCodeInAllDirsOfAllSites ($style) {
			$sites	= explode(' ', SITE_HIERARCHY);
			$code	= '';

			# We're starting backwards with the top-prio site first, 
			# its code should be last in the generated style
			foreach ($sites as $site) {
				# CSS-"Controllers"-dir
				$path = DOCROOT . $site . '/Styles/' . $style . '/controllers/';
				if (is_dir($path)) {
					$code = self::getCodeInDirs($path, '-page', $site, $style) . $code;
				}

				# CSS-"Modules"-dir
				$path = DOCROOT . $site . '/Styles/' . $style . '/modules/';
				if (is_dir($path)) {
					$code = self::getCodeInDirs(array($path), '', $site, $style) . $code;
				}

				# CSS-"Root"-dir
				$path = DOCROOT . $site . '/Styles/' . $style . '/';
				if (is_dir($path)) {
					$code = self::getCodeInDirs(array($path), false, $site, $style) . $code;
				}

				# Common-dir
				$path = DOCROOT . $site . '/Styles/__common/';
				if (is_dir($path)) {
					$code = self::getCodeInDirs(array($path), false, $site, $style) . $code;
				}

				# Module dirs
				$dirs = array();
				$path = DOCROOT . $site . '/Modules/';

				if (is_dir($path)) {
					$dh = opendir($path);

					while ($f = readdir($dh)) {
						if ('.' != $f and '..' != $f and is_dir($path . $f)) {
							$dirs[] = $path . $f . '/';
						}
					}
				}

				$code = self::getCodeInDirs($dirs, false, $site, $style) . $code;
			}

			return $code;
		}

		/**
		 * getCodeInDir
		 *
		 * Gets all code in a particular directory. Sorts on filename
		 */
		private static function getCodeInDirs ($dirs, $prefixSelectorsWithFilename = false, $site, $style) {
			$code	= '';
			$files	= array();

			foreach ($dirs as $dir) {
				$dh = opendir($dir);

				if ($dh) {
					while ($f = readdir($dh)) {
						if (self::$type == end(explode('.', $f)) and !in_array($f, self::$exclude) and substr($f, 0, 2) != '__') {
							$files["$dir$f"] = strtolower($dir . $f);
						}
					}
				}
			}

			asort($files);

			foreach ($files as $path => $name) {
				$code .= "\n\n/* ==== [ $name ] ==== */\n";
				$contents = file_get_contents($path);
				$contents = str_replace('url(gfx/', 'url(' . WEBROOT . $site . '/Styles/' . $style . '/gfx/', $contents);
				$contents = str_replace('url(common_gfx/', 'url(' . WEBROOT . 'aFramework/Styles/gfx/', $contents);

				if (self::$type == 'css' and $prefixSelectorsWithFilename !== false) {
					$fileNameNoExt = end(explode('/', substr($name, 0, -(strlen(end(explode('.', $name)))+1))));

					$code .= CSSSelectorPrefixer::prefixSelectors($contents, '#' . $fileNameNoExt . $prefixSelectorsWithFilename);
				}
				else {
					$code .= $contents . "\n";
				}
			}

			return $code;
		}

		private static function getJSLangCode () {
			$langs	= Lang::getLang();
			$code	= 'Lang.lang = {';

			foreach ($langs[Config::get('general.lang')] as $k => $v) {
				$code .= "'$k': '$v', \n";
			}

			return substr($code, 0, -3) . "\n\n};"; 
		}
	}
?>