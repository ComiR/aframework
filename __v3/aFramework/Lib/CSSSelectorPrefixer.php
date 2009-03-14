<?php
	class CSSSelectorPrefixer {
		private static $code;
		private static $prefix;

		public static function prefixSelectors ($code, $prefix) {
			self::$code		= $code;
			self::$prefix	= $prefix;

			self::compress();
			self::prefix();

			return self::$code;
		}

		private static function compress () {
			self::$code = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', self::$code);
			self::$code = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', self::$code);
			self::$code = str_replace('{ ', '{', self::$code);
			self::$code = str_replace(' }', '}', self::$code);
			self::$code = str_replace('; ', ';', self::$code);
		}

		private static function prefix () {
			self::$code = preg_replace_callback('/(^|})(.*?){/', array('self', 'prefixCallback'), self::$code);
			self::$code = str_replace(self::$prefix . ' ' . self::$prefix, self::$prefix, self::$code);
		}

		private static function prefixCallback ($m) {
			$selectors = explode(',', $m[2]);

			foreach ($selectors as $k => $v) {
				$selectors[$k] = self::$prefix . ' ' . $v;
			}

			$selectors = implode(',', $selectors);

			return $m[1] .$selectors . '{';
		}
	}
?>