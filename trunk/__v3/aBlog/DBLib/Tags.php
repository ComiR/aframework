<?php
	class Tags {
		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000) {
			return DBRow::get(Config::get('db.table_prefix') . 'tags', $sort, $order, $start, $limit);
		}

		public static function insert ($row) {
			$fields	= array(
				'title'			=> $row['title']
			);

			return DBRow::insert(Config::get('db.table_prefix') . 'tags', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update(Config::get('db.table_prefix') . 'tags', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete(Config::get('db.table_prefix') . 'tags', $id);
		}
	}
?>