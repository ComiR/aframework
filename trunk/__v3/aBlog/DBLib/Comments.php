<?php
	class Comments {
		public static function get ($sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000) {
			return DBRow::get(Config::get('db.table_prefix') . 'comments', $sort, $order, $start, $limit);
		}

		public static function insert ($row) {
			$fields	 = array(
				'articles_id'		=> $row['articles_id'], 
				'spam'				=> SpamChecker::isSpam($row), 
				'ip'				=> $_SERVER['REMOTE_ADDRESS'], 
				'author'			=> $row['author'], 
				'email'				=> $row['email'], 
				'website'			=> $row['website'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s')
			);

			return DBRow::insert(Config::get('db.table_prefix') . 'comments', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'articles_id', 
				'spam', 
				'author', 
				'email', 
				'website', 
				'content', 
				'pub_date'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update(Config::get('db.table_prefix') . 'comments', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete(Config::get('db.table_prefix') . 'comments', $id);
		}
	}
?>