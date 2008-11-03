<?php
	class Config {
		private static $config = array();

		public static function set($k, $v) {
			$levels	= explode('.', $k);
			$tmp	= &self::$config;

			foreach($levels as $l) {
				$tmp = &$tmp[$l];
			}

			self::$config[$k]['value'] = $v;
		}

		public static function get($k) {
			return array(
				'key'		=> $k, 
				'value'		=> self::$config[$k]['value'] 
			);
		}
	}
?>
