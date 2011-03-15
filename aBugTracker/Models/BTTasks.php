<?php
	class BTTasks {
		public static function getByURLStr ($taskURLStr, $projectURLStr) {
			return self::get('title', 'ASC', 0, 1, '{bt_tasks}.url_str = "' . escSQL($taskURLStr) . '" AND {bt_projects}.url_str = "' . escSQL($projectURLStr) . '"');
		}

		public static function getByProjectsID ($id, $sort = 'pub_date', $order = 'DESC') {
			return self::get($sort, $order, 0, 1000000, 'bt_projects_id = ' . escSQL($id));
		}

		public static function getBySprintsID ($id) {
			return self::get('project_title, state', 'ASC', 0, 1000000, 'bt_sprints_id = ' . escSQL($id));
		}

		public static function getByID ($id) {
			return self::get('pub_date', 'DESC', 0, 1, 'bt_tasks_id = ' . escSQL($id));
		}

		public static function get ($sort = 'pub_date', $order = 'ASC', $start = 0, $limit = 10000000, $where = '1 = 1') {
			$res = DB::qry('
				SELECT
					{bt_tasks}.*, 
					{bt_tasks}.url_str AS task_url_str, 
					MD5({bt_tasks}.author) AS author_email_md5, 
					IF({bt_tasks}.assigned = "", "", MD5({bt_tasks}.assigned)) AS assigned_email_md5, 
					{bt_projects}.title AS project_title, 
					{bt_projects}.url_str AS project_url_str, 
					CONCAT("' . WEBROOT . '", {bt_projects}.title, "/thumb.png") AS project_thumb_src, 
					CONCAT("' . DOCROOT . '", {bt_projects}.title, "/thumb.png") AS project_thumb_path, 
					{bt_sprints}.bt_sprints_id AS sprint_id, 
					{bt_sprints}.title AS sprint_title, 
					{bt_sprints}.start_date AS sprint_start_date, 
					{bt_sprints}.end_date AS sprint_end_date, 
					{bt_sprint_tasks}.date_fixed AS date_fixed, 
					DATE_FORMAT(pub_date, "%Y") AS year, 
					DATE_FORMAT(pub_date, "%m") AS month, 
					DATE_FORMAT(pub_date, "%d") AS day
				FROM
					{bt_tasks}
				LEFT JOIN
					{bt_projects} USING (bt_projects_id)
				LEFT JOIN
					{bt_sprint_tasks} USING (bt_tasks_id)
				LEFT JOIN
					{bt_sprints} USING (bt_sprints_id)
				WHERE 
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
				'bt_projects_id'	=> $row['bt_projects_id'], 
				'title'				=> $row['title'], 
				'author'			=> $row['author'], 
				'assigned'			=> isset($row['assigned']) ? $row['assigned'] : '', 
				'content'			=> $row['content'], 
				'priority'			=> $row['priority'], 
				'state'				=> isset($row['state']) ? $row['state'] : 'New', 
				'pub_date'			=> (isset($row['pub_date']) and !empty($row['pub_date'])) ? $row['pub_date'] : date('Y-m-d H:i:s'), 
				'url_str'			=> (isset($row['url_str']) and !empty($row['url_str'])) ? Router::urlize($row['url_str']) : Router::urlize($row['title'])
			);

			return DBRow::insert('bt_tasks', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'bt_projects_id', 
				'title', 
				'author', 
				'assigned', 
				'content', 
				'priority', 
				'state', 
				'pub_date', 
				'url_str'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('bt_tasks', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('bt_tasks', $id);
		}
	}
?>
