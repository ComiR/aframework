<?php
	class Users {
		public static function getByUsernamePassword ($username, $password) {
			return self::get('first_name', 'ASC', 0, 1, 'username = "' . escSQL($username) . '" AND password = "' . escSQL($password) . '"');
		}

		public static function get ($sort = 'first_name', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1') {
			return DBRow::get('users', $sort, $order, $start, $limit, $where, $select);
		}

		public static function insert ($row) {
			$fields	= array(
				'offices_id'		=> $row['offices_id'], 
				'username'		=> $row['username'], 
				'password'		=> md5(Config::get('admin.salt') . $row['password']), 
				'first_name'		=> $row['first_name'], 
				'last_name'		=> $row['last_name'], 
				'description'		=> $row['description'], 
				'phone'			=> $row['phone'], 
				'email'			=> $row['email'], 
				'city'			=> $row['city'], 
				'official_id'		=> $row['official_id']
			);

			return DBRow::insert('users', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'offices_id',  
				'username', 
				'password', 
				'first_name', 
				'last_name', 
				'description', 
				'phone', 
				'email', 
				'city', 
				'official_id'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('users', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('users', $id);
		}
	}
?>
