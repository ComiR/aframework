<?php
	class aBugTracker_TaskModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['task'] = BTTasks::getById(Router::$params['bt_tasks_id']))) {
				FourOFour::run();
			}
		}
	}
?>
