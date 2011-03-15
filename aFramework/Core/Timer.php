<?php
	class Timer {
		private static $timer;

		public static function start () {
			self::$timer = microtime(true);
		}

		public static function stop () {
			return microtime(true) - self::$timer;
		}
	}
?>
