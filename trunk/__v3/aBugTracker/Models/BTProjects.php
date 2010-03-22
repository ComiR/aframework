<?php
	class BTProjects {
		public static function getByID ($id) {
			return self::get('title', 'ASC', 0, 1, 'bt_projects_id = ' . escSQL($id));
		}

		public static function getByURLStr ($urlStr) {
			return self::get('title', 'ASC', 0, 1, 'url_str = "' . escSQL($urlStr) . '"');
		}

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000, $where = '1 = 1') {
			$res = DB::qry('
				SELECT
					bt_projects.*, 
					bt_projects.url_str AS project_url_str, 
					COUNT(bt_tasks_id) as num_tasks, 
					CONCAT("' . WEBROOT . '", bt_projects.title, "/thumb.png") AS thumb_src, 
					CONCAT("' . DOCROOT . '", bt_projects.title, "/thumb.png") AS thumb_path
				FROM
					bt_projects
				LEFT JOIN
					bt_tasks USING(bt_projects_id)
				GROUP BY
					bt_projects.bt_projects_id
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
				'title'		=> $row['title'], 
				'url_str'	=> (isset($row['url_str']) and !empty($row['url_str'])) ? Router::urlize($row['url_str']) : Router::urlize($row['title'])
			);

			return DBRow::insert('bt_projects', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title', 
				'url_str'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('bt_projects', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('bt_projects', $id);
		}
	}
?>
