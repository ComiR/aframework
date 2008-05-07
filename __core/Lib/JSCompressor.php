<?php
	$docRoot = str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/');

	require_once 'JavaScriptPacker.php';
	require_once $docRoot .'__core/Config.php';

	# Not part of class...
	header('Content-type: application/x-javascript');

	# Get all module-JS
	$modulesDir = $docRoot .'__core/Modules/';
	$dirs = array();
	$dh = opendir($modulesDir);
	while($f = readdir($dh)) {
		if($f != '..' and $f != '.' and is_dir($modulesDir .$f)) {
			$dirs[] = $modulesDir .$f;
		}
	}

	# Get style-JS
	$stylesDir = $docRoot .'__styles/';
	$dirs[] = (isset($_COOKIE['style'])) ? $stylesDir .$_COOKIE['style'] : $stylesDir .DEFAULT_STYLE;

	$JSCompressor = new JSCompressor($dirs);
	echo $JSCompressor->pack();

	/**
	 * Merges every .js-file in directory/ies $dirs
	 * into one file and compresses them using
	 * Dead Edwards JavaScript-Packer
	 * 
	 * @class JSCompressor
	 */
	class JSCompressor {
		private $code;

		/**
		 * Gets all JS-code in directory/ies $dirs
		 *
		 * @method __construct
		 */
		public function __construct($dirs, $not = array()) {
			if(!is_array($not)) {
				$not[] = $not;
			}

			$this->getCodeFromDirs($dirs, $not);
		}

		/**
		 * Packs the JS-code using Dean Edwards JS-packer
		 *
		 * @method pack
		 */
		public function pack() {
			return $this->code;
			$packer = new JavaScriptPacker($this->code, 0); // 0 compression because regardless of compression gzipped size is basically the same and uncompresson is slow

			return $packer->pack();
		}

		/**
		 * Gets all JS-code in directory/ies $dirs
		 *
		 * @method getCodeFromDirs
		 */
		private function getCodeFromDirs($dirs, $not = array()) {
			$this->code = '';

			if(!is_array($dirs)) {
				$tmp = $dirs;
				$dirs = array();
				$dirs[] = $tmp;
			}

			foreach($dirs as $dir) {
				$dh = opendir($dir);
				if($dh) {
					while($f = readdir($dh)) {
						if('js' == end(explode('.', $f)) and !in_array($f, $not)) {
							$files[] = "$dir/$f";
						}
					}
				}
			}

			sort($files);

			foreach($files as $f) {
				$this->code .= file_get_contents($f);
			}
		}
	}
?>