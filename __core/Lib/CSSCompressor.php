<?php
	# Not part of class...
	header('Content-Type: text/css');
	$docRoot = str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/');
	$CSSCompressor = new CSSCompressor(array($docRoot .'__styles/__common/', $docRoot .'__styles/' .$_GET['current_style'] .'/'));
	echo $CSSCompressor->pack();

	/**
	 * Merges every .css-file in directory/ies $dirs
	 * into one file and compresses them
	 * also parses $constants
	 * 
	 * @class CSSCompressor
	 */
	class CSSCompressor {
		private $code;
		private $constantSelectors = array();

		/**
		 * Gets all CSS-code in dir(s) $dirs
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
		 * Compresses the code and takes care of constans
		 *
		 * @method pack
		 */
		public function pack() {
			$this->compress();
			$this->extractConstantSelectors();
			$this->replaceConstantDefinitions();

			return $this->code;
		}

		/**
		 * Extracts and removes 'constant selectors' (#selector = $constant;) from code
		 *
		 * @method extractConstantSelectors
		 */
		private function extractConstantSelectors() {
			$matches = array();
			$mergedSelectors = array();
			$pattern = '/([^;}]*?)=\s*?(\$.*?);/';

			preg_match_all($pattern, $this->code, $matches);

			$i = 0;
			foreach($matches[1] as $selector) {
				$selector = trim($selector);
				$constant = trim($matches[2][$i++]);
				$mergedSelectors[$constant][] = $selector;
			}

			$this->code = preg_replace($pattern, '', $this->code);
			$this->constantSelectors = $mergedSelectors;
		}

		/**
		 * Replaces all constant-definitions ($constant {css}) with the selectors that wanted them
		 *
		 * @method replaceConstantDefinitions
		 */
		private function replaceConstantDefinitions() {
			$matches = array();
			$find = array();
			$replace = array();
			$pattern = '/\s?(\$[^\.:\s]*)(.*?){/';

			preg_match_all($pattern, $this->code, $matches);

			$i = 0;
			foreach($matches[1] as $constant) {
				$find[$i] = trim($constant .$matches[2][$i]);
				$replace[$i] = array();
				if(isset($this->constantSelectors[$constant])) {
					foreach($this->constantSelectors[$constant] as $selector) {
						$replace[$i][] = trim($selector .$matches[2][$i]);
					}
				}
				$replace[$i] = implode($replace[$i], ',');
				$i++;
			}

			uasort($find, array($this, 'cmp'));

			# There's a reason for this... (order of keys and key-values and shit...)
			$tmp = array();
			foreach($find as $k => $v) {
				$tmp[$k] = $replace[$k];
			}
			$replace = $tmp;

			$this->code = str_replace($find, $replace, $this->code);
		}

		private function cmp($a, $b) {
			$aLen = strlen($a);
			$bLen = strlen($b);

			if($aLen == $bLen) {
				return 0;
			}

			return ($aLen > $bLen) ? -1 : 1;
		}

		/**
		 * Removes comments, white-space and line-breaks from code
		 *
		 * @method compress
		 */
		private function compress() {
			$this->code = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $this->code);
			$this->code = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $this->code);
			$this->code = str_replace('{ ', '{', $this->code);
			$this->code = str_replace(' }', '}', $this->code);
			$this->code = str_replace('; ', ';', $this->code);
		}

		/**
		 * Gets all CSS-code in directory/ies $dirs
		 *
		 * @method getCodeFromDirs
		 */
		private function getCodeFromDirs($dirs, $not) {
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
						if('css' == end(explode('.', $f)) and !in_array($f, $not)) {
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