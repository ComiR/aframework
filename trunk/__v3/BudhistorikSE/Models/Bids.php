<?php
	class Bids {
		public static function getByID ($id) {
			return self::get('pub_date', 'DESC', 0, 1, 'bids_id = ' . escSQL($id));
		}

		public static function getByObjectsID ($id) {
			return self::get('pub_date', 'DESC', 0, INFINITY, 'objects_id = ' . escSQL($id));
		}

		public static function get ($sort = 'amount', $order = 'DESC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1') {
			return DBRow::get('bids', $sort, $order, $start, $limit, $where, $select);
		}

		public static function insert ($row) {
			$fields	= array(
				'users_id'		=> $row['users_id'], 
				'objects_id'		=> $row['objects_id'], 
				'first_name'		=> $row['first_name'], 
				'last_name'		=> $row['last_name'], 
				'id_number'		=> $row['id_number'], 
				'phone'			=> $row['phone'], 
				'amount'		=> $row['amount'], 
				'active'		=> (!isset($row['active']) or $row['active']) ? 1 : 0,
				'pub_date'		=> (isset($row['pub_date']) and strlen($row['pub_date'])) ? $row['pub_date'] : date('Y-m-d H:i:s')
			);

			return DBRow::insert('bids', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'users_id', 
				'objects_id', 
				'first_name', 
				'last_name', 
				'id_number', 
				'phone', 
				'amount', 
				'active',
				'pub_date'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('bids', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('bids', $id);
		}
	}
?>
