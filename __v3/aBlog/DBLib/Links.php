<?php
	class Links {
		public static function get ( $sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000 ) {
			return DBRow::get(Config::get('db.table_prefix') .'links', $sort, $order, $start, $limit);
		}

		public static function insert ( $row ) {
			$fields	= array(
				'title'			=> $row['title'], 
				'description'	=> $row['description'], 
				'url'			=> $row['url']
			);

			return DBRow::insert(Config::get('db.table_prefix') .'links', $fields);
		}

		public static function update ( $id, $row ) {
			$validFields = array(
				'title', 
				'description', 
				'url'
			);
			$fields = array();

			foreach ( $row as $col => $val ) {
				if ( in_array($col, $validFields) ) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update(Config::get('db.table_prefix') .'links', $id, $fields);
		}

		public static function delete ( $id ) {
			return DBRow::delete(Config::get('db.table_prefix') .'links', $id);
		}
	}
?>