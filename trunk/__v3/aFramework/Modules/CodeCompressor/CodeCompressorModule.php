<?php
	class aFramework_CodeCompressorModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		protected static $type;
		protected static $exclude = array();

		private static $mimeTypes = array(
			'css' => 'text/css', 
			'js' => 'application/x-javascript'
		);

		public static function run() {
			header('Content-type: ' .self::$mimeTypes[self::$type]);

			$style = removeDots(@$_GET['s']);

			# If the requested style exists in the current site's Style-dir
			# it's considered a valid style.
			if(self::$type == 'css' and !is_dir(CURRENT_SITE_DIR .'Styles/' .$style .'/')) {
				return false;
			}

			# Get the highest last modified date of all the files in all the dirs
			$fileLastModified = self::getLastModifiedFile($style);

			# See if any cache of this script exists and that it's not older than any file
			$cachePath = CACHE_DIR .CURRENT_SITE .'_' .$style .'.' .self::$type;
			if(file_exists($cachePath) and filemtime($cachePath) >= $fileLastModified) {
				self::$tplVars[self::$type] = file_get_contents($cachePath);
			}
			# No cache or old, generate code
			else {
				# Get all the code in all the dirs of all the sites
				$code = self::getAllCodeInAllDirsOfAllSites($style);

				# JS gets packed
				if(self::$type == 'js') {
					$jsPacker = new JavaScriptPacker($code, 0);
					$code = $jsPacker->pack();
				}
				# CSS gets constant-treatment
				elseif(self::$type == 'css') {
					$code = CSSConstants::compile($code);
				}

				# Assign code to template
				self::$tplVars[self::$type] = $code;

				# Also create a cache
				file_put_contents($cachePath, $code);
			}
		}

		/**
		 * getLastModifiedFile
		 *
		 * Gets the last modified file
		 */
		private static function getLastModifiedFile($style) {
			$sites = explode(' ', SITE_HIERARCHY);
			$fileLastModified = 0;
			$dirs = array();

			foreach($sites as $site) {
				$dirs[] = ROOT_DIR .$site .'/Styles/__common/';
				$dirs[] = ROOT_DIR .$site .'/Styles/' .$style .'/';
				$dirs[] = ROOT_DIR .$site .'/Styles/' .$style .'/controllers/';
				$dirs[] = ROOT_DIR .$site .'/Styles/' .$style .'/modules/';

				# Only JS in module-dirs, no CSS
				if(self::$type == 'js' and is_dir(ROOT_DIR .$site .'/Modules/')) {
					$dh = opendir(ROOT_DIR .$site .'/Modules/');

					while($f = readdir($dh)) {
						if('.' != $f and '..' != $f and is_dir(ROOT_DIR .$site .'/Modules/' .$f .'/')) {
							$dirs[] = ROOT_DIR .$site .'/Modules/' .$f .'/';
						}
					}
				}
			}

			foreach($dirs as $dir) {
				$flm = 0;

				if(is_dir($dir)) {
					$dh = opendir($dir);

					while($f = readdir($dh)) {
						if(self::$type == end(explode('.', $f))) {
							$tmpFlm = filemtime($dir .$f);

							if($tmpFlm > $flm) {
								$flm = $tmpFlm;
							}
						}
					}
				}

				if($flm > $fileLastModified) {
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
		private static function getAllCodeInAllDirsOfAllSites($style) {
			$sites = explode(' ', SITE_HIERARCHY);
			$code = '';

			# We're starting backwards with the top-prio site first, 
			# its code should be last in the generated style
			foreach($sites as $site) {
				# CSS-dirs (there may be JS in them as well)
				# Controllers-dir
				$path = ROOT_DIR .$site .'/Styles/' .$style .'/controllers/';
				if(is_dir($path)) {
					$code = self::getCodeInDir($path, '-page') .$code;
				}

				# Modules-dir
				$path = ROOT_DIR .$site .'/Styles/' .$style .'/modules/';
				if(is_dir($path)) {
					$code = self::getCodeInDir($path, '') .$code;
				}

				# "Root"-dir
				$path = ROOT_DIR .$site .'/Styles/' .$style .'/';
				if(is_dir($path)) {
					$code = self::getCodeInDir($path) .$code;
				}

				# Common-dir
				$path = ROOT_DIR .$site .'/Styles/__common/';
				if(is_dir($path)) {
					$code = self::getCodeInDir($path) .$code;
				}

				# Actual module-js
				if(self::$type == 'js') {
					# Real modules-dir
					$path = ROOT_DIR .$site .'/Modules/';
					$dh = opendir($path);

					while($f = readdir($dh)) {
						if('.' != $f and '..' != $f and is_dir($path .$f .'/')) {
							$code = self::getCodeInDir($path .$f .'/', self::$exclude) .$code;
						}
					}
				}
			}

			return $code;
		}

		/**
		 * getCodeInDir
		 *
		 * Gets all code in a particular directory. Sorts on filename
		 */
		private static function getCodeInDir($dir, $prefixSelectorsWithFilename = false) {
			$code	= '';
			$files	= array();
			$dh		= opendir($dir);

			if($dh) {
				while($f = readdir($dh)) {
					if(self::$type == end(explode('.', $f)) and !in_array($f, self::$exclude)) {
						$files[] = $dir .$f;
					}
				}
			}

			sort($files);

			foreach($files as $f) {
				$contents = file_get_contents($f);

				if(self::$type == 'css' and $prefixSelectorsWithFilename !== false) {
					$fileName = end(explode('/', $f));
					$fileNameNoExt = substr($fileName, 0, -(strlen(end(explode('.', $fileName)))+1));

					$code .= CSSSelectorPrefixer::prefixSelectors($contents, '#' .$fileNameNoExt .$prefixSelectorsWithFilename);
				}
				else {
					$code .= $contents;
				}
			}

			return $code;
		}
	}
?>