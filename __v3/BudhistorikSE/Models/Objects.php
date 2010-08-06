<?php
	class Object {
		public static function address($object) {
			$num = escHTML($object['apartment_num']);
			$apartment = empty($num) ? '' : ('lgh ' . $num . ', ');
			return	escHTML($object['address']) . ', ' . $apartment . escHTML($object['postal_code']) . ' ' . escHTML($object['city']);
		}
	}

	class Objects {
		public static function getByOfficesID ($id, $limit = 3) {
			return self::get('start_date', 'DESC', 0, $limit, 'users_id = (SELECT users_id FROM users WHERE offices_id = ' . escSQL($id) . ' LIMIT 1)');
		}

		public static function getNotEnded ($sort = 'start_date', $order = 'ASC', $start = 0, $limit = INFINITY) {
			return self::get($sort, $order, $start, $limit, 'end_date > NOW() OR ISNULL(end_date)');
		}

		public static function getNotSold ($sort = 'start_date', $order = 'ASC', $start = 0, $limit = INFINITY) {
			return self::get($sort, $order, $start, $limit, 'sold != 0');
		}

		public static function getByID ($id) {
			return self::get('address', "ASC", 0, 1, "objects_id=" . escSQL($id));
		}

		public static function get ($sort = 'address', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1') {
			return DBRow::get('objects', $sort, $order, $start, $limit, $where, $select);
		}

		public static function insert ($row) {
			$fields	= array(
				'users_id'		=> $row['users_id'], 
				'address'		=> $row['address'], 
				'postal_code'		=> $row['postal_code'], 
				'city'			=> $row['city'], 
				'apartment_num'		=> $row['apartment_num'], 
				'starting_prince'	=> $row['starting_prince'], 
				'start_date'		=> $row['start_date'], 
				'end_date'		=> $row['end_date'], 
				'sold'			=> $row['sold'] ? 1 : 0, 
				'description'		=> $row['description'], 
				'url'			=> $row['url']
			);

			return DBRow::insert('objects', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'users_id', 
				'address', 
				'postal_code', 
				'city', 
				'apartment_num', 
				'starting_prince', 
				'start_date', 
				'end_date', 
				'sold', 
				'description', 
				'url'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('objects', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('objects', $id);
		}
	}
?>
