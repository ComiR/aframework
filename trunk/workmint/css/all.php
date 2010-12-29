<?php
	error_reporting(E_ALL);
	ini_set('display_errors', true);

	header('Content-type: text/css');

	$CSSCompressor = new CSSCompressor('.', array('all.css', 'print.css'));

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
		 * Compresses the code and takes care of constans
		 *
		 * @method pack
		 */
		public function pack () {
			$this->compress();
			$this->extractConstantSelectors();
			$this->replaceConstantDefinitions();
			$this->removeUnusedConstants();

			return $this->code;
		}

		private function removeUnusedConstants () {
			$matches	= array();
			$keep		= array();

			preg_match_all('/.*?{.*?}/', $this->code, $matches);

			foreach ($matches[0] as $block) {
				if ('{' != substr(trim($block), 0, 1) and !strstr('{}', $block)) {
					$keep[] = $block;
				}
			}

			$this->code = implode('', $keep);
		}

		/**
		 * Extracts and removes 'constant selectors' (#selector = $constant;) from code
		 *
		 * @method extractConstantSelectors
		 */
		private function extractConstantSelectors () {
			$matches			= array();
			$mergedSelectors	= array();
			$pattern			= '/([^;}]*?)=\s*?(\$.*?);/';
			$i					= 0;

			preg_match_all($pattern, $this->code, $matches);

			foreach ($matches[1] as $selector) {
				$selector						= trim($selector);
				$constant						= trim($matches[2][$i++]);
				$mergedSelectors[$constant][]	= $selector;
			}

			$this->code					= preg_replace($pattern, '', $this->code);
			$this->constantSelectors 	= $mergedSelectors;
		}

		/**
		 * Replaces all constant-definitions ($constant {css}) with the selectors that wanted them
		 *
		 * @method replaceConstantDefinitions
		 */
		private function replaceConstantDefinitions () {
			$matches	= array();
			$find		= array();
			$replace	= array();
			$pattern	= '/\s?(\$[^\.:\s]*)(.*?){/';
			$i			= 0;

			preg_match_all($pattern, $this->code, $matches);

			foreach ($matches[1] as $constant) {
				$find[$i]		= trim($constant .$matches[2][$i]);
				$replace[$i]	= array();

				if (isset($this->constantSelectors[$constant])) {
					foreach ($this->constantSelectors[$constant] as $selector) {
						$replace[$i][] = trim($selector .$matches[2][$i]);
					}
				}

				$replace[$i] = implode($replace[$i], ',');

				$i++;
			}

			uasort($find, array($this, 'cmp'));

			# There's a reason for this... (order of keys and key-values and shit...)
			$tmp = array();

			foreach ($find as $k => $v) {
				$tmp[$k] = $replace[$k];
			}

			$replace = $tmp;

			$this->code = str_replace($find, $replace, $this->code);
		}

		# Callback for replaceConstantDefinitions
		private function cmp ($a, $b) {
			$aLen = strlen($a);
			$bLen = strlen($b);

			if ($aLen == $bLen) {
				return 0;
			}

			return ($aLen > $bLen) ? -1 : 1;
		}

		/**
		 * Removes comments, white-space and line-breaks from code
		 *
		 * @method compress
		 */
		private function compress () {
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
		private function getCodeFromDirs ($dirs, $not) {
			$this->code	= '';
			$files		= array();

			foreach ($dirs as $dir) {
				$dh = opendir($dir);

				if ($dh) {
					while ($f = readdir($dh)) {
						if ('css' == end(explode('.', $f)) and !in_array($f, $not)) {
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
