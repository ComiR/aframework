<?php
	class BTSprints {
		public static function removeTaskFromSprints ($taskID) {
			return DB::qry('DELETE FROM {bt_sprint_tasks} WHERE bt_tasks_id = ' . escSQL($taskID));
		}

		public static function addTaskToSprint ($taskID, $sprintID) {
			$fields	= array(
				'bt_sprints_id'		=> $sprintID, 
				'bt_tasks_id'		=> $taskID, 
				'date_fixed'		=> '0000-00-00 00:00:00'
			);

			return DBRow::insert('bt_sprint_tasks', $fields);
		}

		public static function updateTaskFixedDate ($taskID, $date) {
			return DB::qry('UPDATE bt_sprint_tasks SET date_fixed = "' . escSQL($date) . '" WHERE bt_tasks_id = ' . escSQL($taskID));
		}

		public static function getSprintDays ($sprint, $tasks) {
			$startTS	= strtotime($sprint['start_date']);
			$startYear	= date('Y', $startTS);
			$startMonth	= date('m', $startTS);
			$startDay	= date('d', $startTS);
			$start		= date('Y-m-d', $startTS);
			$end		= date('Y-m-d', strtotime($sprint['end_date']));
			$today		= date('Y-m-d');
			$days		= array();
			$i			= 0;
			$numTasks	= count($tasks);

			while (true) {
				$thisDay = date('Y-m-d', mktime(0, 0, 0, $startMonth, $startDay + $i, $startYear));

				if ($thisDay < $end) {
					$numFinishedTasksUpToThisDay = 0;
					$day = array(
						'num'			=> $i, 
						'date'			=> $thisDay, 
						'has_happened'	=> $thisDay <= $today
					);

					if (is_array($tasks) and count($tasks)) {
						foreach ($tasks as $task) {
							if (date('Y-m-d', strtotime($task['date_fixed'])) == $thisDay) {
								$day['finished_tasks'][] = $task;
								$numFinishedTasksUpToThisDay++;
							}
						}
					}

					$day['num_finished_tasks'] = $numFinishedTasksUpToThisDay;

					foreach ($days as $prevDay) {
						if (isset($prevDay['finished_tasks'])) {
							$numFinishedTasksUpToThisDay += count($prevDay['finished_tasks']);
						}
					}

					$day['num_finished_tasks_total'] = $numFinishedTasksUpToThisDay;
					$day['percent'] = round(($numFinishedTasksUpToThisDay / $numTasks) * 100, 1);

					$days[] = $day;
				}
				else {
					break;
				}

				$i++;
			}

			return $days;
		}

		public static function getByID ($id) {
			return self::get('start_date', 'DESC', 0, 1, 'bt_sprints_id = ' . escSQL($id));
		}

		public static function get ($sort = 'start_date', $order = 'ASC', $start = 0, $limit = 10000000, $where = '1 = 1') {
			$res = DB::qry('
				SELECT
					{bt_sprints}.*, 
					IF (start_date < NOW() AND end_date > NOW(), 1, 0) AS in_progress, 
					COUNT(bt_sprint_tasks_id) AS num_total_tasks, 
					(DATEDIFF(NOW(), start_date) + 1) AS today_num, 
					DATEDIFF(end_date, start_date) AS num_total_days
				FROM
					{bt_sprints}
				LEFT JOIN
					{bt_sprint_tasks} USING(bt_sprints_id)
				GROUP BY
					bt_sprints_id
				HAVING
					' . $where . '
				ORDER BY
					' . escSQL($sort) . ' ' . escSQL($order) . '
				LIMIT
					' . escSQL($start) . ', ' . escSQL($limit)
			);

			if (mysql_num_rows($res) === 1) {
				return $limit === 1 ? mysql_fetch_assoc($res) : array(mysql_fetch_assoc($res));
			}
			elseif (mysql_num_rows($res) > 1) {
				$rows = array();

				while ($row = mysql_fetch_assoc($res)) {
					$rows[] = $row;
				}

				return $rows;
			}
			else {
				return false;
			}
		}

		public static function insert ($row) {
			$fields	= array(
				'title'				=> $row['title'], 
				'start_date'		=> $row['start_date'], 
				'end_date'			=> $row['end_date']
			);

			return DBRow::insert('bt_sprints', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title', 
				'start_date', 
				'end_date'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('bt_sprints', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('bt_sprints', $id);
		}
	}
?>
