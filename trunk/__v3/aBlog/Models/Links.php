<?php
	class Links {
		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1') {
			return DBRow::get('links', $sort, $order, $start, $limit, $where, $select);
		}

		public static function insert ($row) {
			$fields	= array(
				'title'			=> $row['title'], 
				'description'	=> $row['description'], 
				'url'			=> $row['url']
			);

			return DBRow::insert('links', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title', 
				'description', 
				'url'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('links', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('links', $id);
		}
	}
?>
