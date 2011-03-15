<?php
	class aFramework_MsgModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_GET['msg'])) {
				if (strstr($_GET['msg'], '|')) {
					$msgBits = explode('|', $_GET['msg']);

					self::$tplVars['title'] = $msgBits[0];
					self::$tplVars['msg'] = $msgBits[1];
				}
				else {
					self::$tplVars['msg'] = $_GET['msg'];
				}
				if (isset($_GET['type'])) {
					if ($_GET['type'] == 'error') {
						self::$tplVars['msg'] = '**' . self::$tplVars['msg'] . '**';
					}
				}
			}
			else {
				self::$tplFile = false;
			}
		}
	}
?>
