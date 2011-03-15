<?php
	header('Content-type: application/x-javascript');
	require_once 'JavaScriptPacker.php';
	$JSCompressor = new JSCompressor( '.', array( 'ie8.js', 'all.js' ) );
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
#			return $this->code;
			$packer = new JavaScriptPacker($this->code, 0); // 0 compression because regardless of compression gzipped size is basically the same and uncompresson is slow

			return $packer->pack();
		}

		/**
		 * Gets all JS-code in directory/ies $dirs
		 *
		 * @method getCodeFromDirs
		 */
		private function getCodeFromDirs($dirs, $not) {
			$this->code = '';
			$files = array();

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
