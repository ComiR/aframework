<?php
	class aBugTracker_TaskModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['task'] = BTTasks::getByURLStr(Router::$params['task_url_str']))) {
				FourOFour::run();
			}
		}
	}
?>
