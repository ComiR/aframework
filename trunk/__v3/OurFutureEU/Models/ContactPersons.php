<?php
	class ContactPersons {
		public static function getByPagesID ($pagesID) {
			$res = DB::qry('
				SELECT
					*
				FROM
					contact_person_relations
				LEFT JOIN
					contact_persons USING (contact_persons_id)
				WHERE
					pages_id = ' . escSQL($pagesID)
			);

			if (mysql_num_rows($res)) {
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

		public static function get ($sort = 'country', $order = 'ASC', $start = 0, $limit = 10000000) {
			return DBRow::get('contact_persons', $sort, $order, $start, $limit);
		}

		public static function insert ($row) {
			$fields	= array(
				'name'				=> $row['name'], 
				'tel'				=> $row['tel'], 
				'email'				=> $row['email'], 
				'country'			=> $row['country']
			);

			return DBRow::insert('contact_persons', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'name', 
				'tel', 
				'email', 
				'country'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('contact_persons', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('contact_persons', $id);
		}
	}
?>
