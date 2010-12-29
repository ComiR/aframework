<?php
	error_reporting(E_ALL);
	ini_set('display_errors', true);

	header('Content-type: application/x-javascript');

	require_once 'JavaScriptPacker.php';

	$JSCompressor = new JSCompressor('.', array('all.js', 'ie6.js', 'DD_belatedPNG_0.0.8a-min.js'));

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
		public function __construct ($d, $n = array()) {
			if (!is_array($n)) {
				$not[] = $n;
			}
			else {
				$not = $n;
			}

			if (!is_array($d)) {
				$dirs[] = $d;
			}
			else {
				$dirs = $d;
			}

			$this->getCodeFromDirs($dirs, $not);
		}

		/**
		 * Packs the JS-code using Dean Edwards JS-packer
		 *
		 * @method pack
		 */
		public function pack () {
			# 0 compression because regardless of compression gzipped size
			# is basically the same and uncompresson is slow
			$packer = new JavaScriptPacker($this->code, 0);

			$this->code = $packer->pack();

			return $this->code;
		}

		/**
		 * Gets all JS-code in directory/ies $dirs
		 *
		 * @method getCodeFromDirs
		 */
		private function getCodeFromDirs ($dirs, $not) {
			$this->code	= '';
			$files		= array();

			foreach ($dirs as $dir) {
				$dh = opendir($dir);

				if ($dh) {
					while ($f = readdir($dh)) {
						if ('js' == end(explode('.', $f)) and !in_array($f, $not)) {
							$files[] = "$dir/$f";
						}
					}
				}
			}

			sort($files);

			foreach ($files as $f) {
				$this->code .= file_get_contents($f);
			}
		}
	}
?>
