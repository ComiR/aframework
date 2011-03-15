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

			$numFinishedTasks = 0;

			foreach (self::$tplVars['sprint']['days'] as $day) {
				if ($day['date'] <= date('Y-m-d') and isset($day['finished_tasks'])) {
					$numFinishedTasks += count($day['finished_tasks']);
				}
			}

			self::$tplVars['sprint']['num_finished_tasks'] = $numFinishedTasks;
		}
	}
?>
