<?php
	/**
	 * Compresses CSS and parses constants
	 * 
	 * @class CSSConstants
	 */
	class CSSConstants {
		private static $code;
		private static $constantSelectors = array();

		/**
		 * Compresses the code and takes care of constans
		 *
		 * @method pack
		 */
		public static function compile($code) {
			self::$code = $code;

			self::compress();
			self::extractConstantSelectors();
			self::replaceConstantDefinitions();
			self::removeUnusedConstants();

			return self::$code;
		}

		/**
		 * Removes unused constants
		 *
		 * @method removeUnusedConstants
		 */
		private static function removeUnusedConstants() {
			$matches	= array();
			$keep		= array();

			preg_match_all('/.*?{.*?}/', self::$code, $matches);

			foreach($matches[0] as $block) {
				$block = trim($block);

				if('{' != substr($block, 0, 1) and !strstr('{}', $block)) {
					$keep[] = $block;
				}
			}

			self::$code = implode('', $keep);
		}

		/**
		 * Removes comments, white-space and line-breaks from code
		 *
		 * @method compress
		 */
		private static function compress() {
			self::$code = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', self::$code);
			self::$code = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', self::$code);
			self::$code = str_replace('{ ', '{', self::$code);
			self::$code = str_replace(' }', '}', self::$code);
			self::$code = str_replace('; ', ';', self::$code);
		}

		/**
		 * Extracts and removes 'constant selectors' (#selector = $constant;) from code
		 *
		 * @method extractConstantSelectors
		 */
		private static function extractConstantSelectors() {
			$matches = array();
			$mergedSelectors = array();
			$pattern = '/([^;}]*?)=\s*?(\$.*?);/';

			preg_match_all($pattern, self::$code, $matches);

			$i = 0;
			foreach($matches[1] as $selector) {
				$selector = trim($selector);
				$constant = trim($matches[2][$i++]);
				$mergedSelectors[$constant][] = $selector;
			}

			self::$code = preg_replace($pattern, '', self::$code);
			self::$constantSelectors = $mergedSelectors;
		}

		/**
		 * Replaces all constant-definitions ($constant {css}) with the selectors that wanted them
		 *
		 * @method replaceConstantDefinitions
		 */
		private static function replaceConstantDefinitions() {
			$matches	= array();
			$find		= array();
			$replace	= array();
			$pattern	= '/\s?(\$[^\.:\s]*)(.*?){/';
			$i			= 0;

			preg_match_all($pattern, self::$code, $matches);

			foreach($matches[1] as $constant) {
				$find[$i]		= trim($constant . $matches[2][$i]);
				$replace[$i]	= array();

				if(isset(self::$constantSelectors[$constant])) {
					foreach(self::$constantSelectors[$constant] as $selector) {
						$replace[$i][] = trim($selector . $matches[2][$i]);
					}
				}

				$replace[$i] = implode($replace[$i], ',');
				$i++;
			}

			uasort($find, array('self', 'replaceConstantDefinitionsCallback'));

			# There's a reason for this... (order of keys and key-values and shit...)
			$tmp = array();

			foreach($find as $k => $v) {
				$tmp[$k] = $replace[$k];
			}

			$replace = $tmp;

			self::$code = str_replace($find, $replace, self::$code);
		}

		private static function replaceConstantDefinitionsCallback($a, $b) {
			$aLen = strlen($a);
			$bLen = strlen($b);

			if($aLen == $bLen) {
				return 0;
			}

			return ($aLen > $bLen) ? -1 : 1;
		}
	}
?>
