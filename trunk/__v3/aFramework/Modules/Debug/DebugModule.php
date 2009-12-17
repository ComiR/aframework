<?php
	class aFramework_DebugModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplFile = ADMIN ? true : false;
		}

		public static function addItem ($title, $url, $pos = false) {
			if ($pos === false) {
				self::$tplVars['nav_items'][] = array('title' => $title, 'url' => $url);
			}
			else {
				if (!isset(self::$tplVars['nav_items'])) {
					self::$tplVars['nav_items'] = array();
				}

				array_insert(array('title' => $title, 'url' => $url), $pos, self::$tplVars['nav_items']);
			}
		}
	}
?>
