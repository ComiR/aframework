<?php
	class aBugTracker_SprintModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!(self::$tplVars['sprint'] = BTSprints::get('end_date', 'DESC', 0, 1))) {
				return self::$tplFile = false;
			}

			self::$tplVars['sprint']['tasks'] = BTTasks::getBySprintsID(self::$tplVars['sprint']['bt_sprints_id']);
			self::$tplVars['sprint']['days'] = BTSprints::getSprintDays(self::$tplVars['sprint'], self::$tplVars['sprint']['tasks']);
		}
	}
?>
