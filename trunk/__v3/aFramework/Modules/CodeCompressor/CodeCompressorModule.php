<?php
	class aFramework_CodeCompressorModule {
		public static $tplVars		= array();
		public static $tplFile		= true;

		protected static $type;
		protected static $exclude	= array();

		private static $debug		= array();
		private static $mimeTypes	= array(
			'css'	=> 'text/css', 
			'js'	=> 'application/x-javascript'
		);

		public static function run () {
			# A style needs to be set
			if (!isset($_GET['s'])) {
				return self::$tplFile = false;
			}

			# Default to CSS
			self::$type	= (isset($_GET['t']) and array_key_exists($_GET['t'], self::$mimeTypes)) ? $_GET['t'] : 'css';

			# Some vars we need
			$cacheTime	= ADMIN ? 0 : 3600;
			$style		= basename($_GET['s']);
			$styleData	= Styles::getByName($style);
			$code		= '';

			# Set correct content-type and cache
			header('Content-type: ' . self::$mimeTypes[self::$type] . '; charset=utf-8');
			header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $cacheTime) . ' GMT');

			# See if this style extends other styles, if so include them as well
			if (isset($styleData['extends'])) {
				$extends = explode(',', $styleData['extends']);

				foreach ($extends as $extend) {
					$code .= self::getStyleCode(trim($extend), $cacheTime);
				}
			}

			# Set some debug info
			self::$debug['type']			= self::$type;
			self::$debug['style']			= $style;
			self::$debug['style_data']		= $styleData;
			self::$debug['cache_time']		= $cacheTime;

			# Now include this style's code
			self::$tplVars['code'] = $code . self::getStyleCode($style, $cacheTime);
		}

		private static function getStyleCode ($style, $cacheTime = 3600) {
			$cacheTime		= ADMIN ? 0 : $cacheTime;
			$cachePath		= DOCROOT . 'aFramework/Cache/' . CURRENT_SITE . '_' . $style . '.' . self::$type;
			$cacheExists	= file_exists($cachePath);
			$cacheModified	= $cacheExists ? filemtime($cachePath) : 0;

			# If the requested style exists in the current site's Style-dir
			# _or_ it's a hidden style (prefixed with __) it's considered a valid style.
			if (substr($style, 0, 2) != '__' and !is_dir(CURRENT_SITE_DIR . 'Styles/' . $style . '/')) {
				return false;
			}

			# If the cache is younger than $cacheTime just load it directly and return
			if ((time() - $cacheModified) < $cacheTime) {
				self::$debug['load_type'] = 'Cache - From cache time';

				return file_get_contents($cachePath);
			}

			# Get the highest last modified date of all the files in all
			# the dirs and see if cache is younger than all of them
			$fileLastModified = self::getLastModifiedFile($style);

			if ($cacheModified >= $fileLastModified) {
				self::$debug['load_type'] = 'Cache - From last modified';

				$cachedCode = file_get_contents($cachePath);

				# Rewrite cache so we get som new cacheTime
				@file_put_contents($cachePath, $cachedCode);

				return $cachedCode;
			}

			# No cache or old, generate new
			self::$debug['load_type'] = 'No cache';

			# Get all the code in all the dirs of all the sites
			$code = self::getAllCodeInAllDirsOfAllSites($style);

			# JS gets packed
			if (self::$type == 'js') {
				$code .= Lang::getJSLangCode();
				$jsPacker = new JavaScriptPacker($code, 0);
				$code = $jsPacker->pack();
			}
			# CSS gets constant-treatment
			elseif (self::$type == 'css') {
				$code = CSSConstants::compile($code);
			}

			# Also create a cache
			@file_put_contents($cachePath, $code);

			# Assign code to template
			return $code;
		}

		/**
		 * getLastModifiedFile
		 *
		 * Gets the last modified file
		 */
		private static function getLastModifiedFile ($style) {
			$sites	= explode(' ', SITE_HIERARCHY);
			$dirs	= array();

			# Create array of directories to look for files in
			# Every sites every module and style can contain files
			foreach ($sites as $site) {
				$dirs[] = DOCROOT . $site . '/Styles/' . $style . '/';
				$path	= DOCROOT . $site . '/Modules/';

				# Get module dirs
				if (is_dir($path)) {
					$dh = opendir($path);

					while ($f = readdir($dh)) {
						if ('.' != $f and '..' != $f and is_dir(DOCROOT . $site . '/Modules/' . $f . '/')) {
							$dirs[] = DOCROOT . $site . '/Modules/' . $f . '/';
						}
					}
				}
			}

			$flm = 0;

			# Loop through all the direcoties
			foreach ($dirs as $dir) {
				if (is_dir($dir)) {
					$dh = opendir($dir);

					# Loop through all the files
					while ($f = readdir($dh)) {
						# Check if the file extention is what is being asked for (css/js)
						if (self::$type == end(explode('.', $f))) {
							$tmpFlm = filemtime($dir . $f);

							self::$debug['last_modified_files'][] = array(
								array(
									'path'		=> $dir . $f, 
									'modified'	=> $tmpFlm
								)
							);

							if ($tmpFlm > $flm) {
								$flm = $tmpFlm;
							}
						}
					}
				}
			}

			return $flm;
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
			# its code should be last in the generated style/script
			foreach ($sites as $site) {
				# Style dir
				$path = DOCROOT . $site . '/Styles/' . $style . '/';

				if (is_dir($path)) {
					$code = self::getCodeInDirs(array($path), $site, $style) . $code;
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

				$code = self::getCodeInDirs($dirs, $site, $style) . $code;
			}

			return $code;
		}

		/**
		 * getCodeInDirs
		 *
		 * Gets all code in a particular directory. Sorts on filename
		 */
		private static function getCodeInDirs ($dirs, $site, $style) {
			$code	= '';
			$files	= array();

			# Go through all the dirs and store the files of
			# the requested type that are not prefixed with '__'
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

			# Sort them (that's why we keep the path in 
			# the 'key' and the lower-case path in the 'value')
			asort($files);

			# Now go through all the files and get the code
			foreach ($files as $path => $name) {
				self::$debug['files'][] = $path;

				$contents = file_get_contents($path);

				# Authors can reference gfx/ from their CSS which will point to
				# the current style's gfx-dir _or_ if the file is located in a 
				# module-directory we point it to the module's gfx-dir
				if (preg_match('/Modules\/(.*?)\//', $path, $matches)) {
					$contents = str_replace('url(gfx/', 'url(' . WEBROOT . $site . '/Modules/' . $matches[1] . '/gfx/', $contents);
				}
				else {
					$contents = str_replace('url(gfx/', 'url(' . WEBROOT . $site . '/Styles/' . $style . '/gfx/', $contents);
				}

				# Authors can reference common_gfx/ from their CSS which we now point to 
				# the absolute path of the Base/gfx-dir
				$contents = str_replace('url(common_gfx/', 'url(' . WEBROOT . 'aFramework/Modules/Base/gfx/', $contents);

				$code .= $contents . "\n";
			}

			return $code;
		}
	}
?>
