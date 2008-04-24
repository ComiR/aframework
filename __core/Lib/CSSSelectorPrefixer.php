<?php
	function prefixCSSSelectors($code, $prefix) {
		$csp = new CSSSelectorPrefixer($code, $prefix);
		return $csp->prefixSelectors();
	}

	class CSSSelectorPrefixer {
		private $code;
		private $prefix;

		public function __construct($code, $prefix) {
			$this->code = $code;
			$this->prefix = $prefix;
		}

		public function prefixSelectors() {
			$this->compress();
			$this->prefix();

			return $this->code;
		}

		private function compress() {
			$this->code = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $this->code);
			$this->code = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $this->code);
			$this->code = str_replace('{ ', '{', $this->code);
			$this->code = str_replace(' }', '}', $this->code);
			$this->code = str_replace('; ', ';', $this->code);
		}

		private function prefix() {
			$this->code = preg_replace_callback('/(^|})(.*?){/', array($this, 'prefixCallback'), $this->code);
			$this->code = str_replace($this->prefix .' ' .$this->prefix, $this->prefix, $this->code);
		}

		private function prefixCallback($m) {
			$selectors = explode(',', $m[2]);

			foreach($selectors as $k => $v) {
				$selectors[$k] = $this->prefix .' ' .$v;
			}

			$selectors = implode(',', $selectors);

			return $m[1] .$selectors .'{';
		}
	}
?>