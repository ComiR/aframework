<?php
	class Offices {
		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1') {
			return DBRow::get('offices', $sort, $order, $start, $limit, $where, $select);
		}

		public static function insert ($row) {
			$fields	= array(
				'title'			=> $row['title'], 
				'description'		=> $row['description'], 
				'address'		=> $row['address'], 
				'postal_code'		=> $row['postal_code'], 
				'city'			=> $row['city'], 
				'phone'			=> $row['phone'], 
				'fax'			=> $row['fax'], 
				'email'			=> $row['email'], 
				'website'		=> $row['website'], 
				'official_id'		=> $row['official_id']
			);

			return DBRow::insert('offices', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title', 
				'description', 
				'address', 
				'postal_code', 
				'city', 
				'phone', 
				'fax', 
				'email', 
				'website', 
				'official_id'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('offices', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('offices', $id);
		}
	}
?>
