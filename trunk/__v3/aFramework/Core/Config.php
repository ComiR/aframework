<?php
	class Config {
		private static $config = array();

		public static function set($k, $v) {
			$levels	= explode('.', $k);
			$tmp	= &self::$config;

			foreach($levels as $l) {
				$tmp = &$tmp[$l];
			}

			$tmp = array(
				'value'			=> is_array($v) ? $v['value'] : $v, 
				'key'			=> $k, 
				'highest_key'	=> $l, 
				'title'			=> (is_array($v) and isset($v['title'])) ? htmlentities($v['title']) : htmlentities(ucfirst(str_replace('_', ' ', $l))), 
				'default_value'	=> (is_array($v) and isset($v['default_value'])) ? htmlentities($v['default_value']) : (is_array($v) ? htmlentities($v['value']) : htmlentities($v))
			);
		}

		public static function get($k) {
			$levels	= explode('.', $k);
			$tmp	= &self::$config;

			foreach($levels as $l) {
				$tmp = &$tmp[$l];
			}

			return $tmp['value'];
		}

		public static function asArray() {
			return self::$config;
		}
	}
?>
