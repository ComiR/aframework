<?php
	class Links extends DBRow {
		public static function getLinks($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000) {
			return parent::get(Config::get('db.table_prefix') .'links', $sort, $order, $start, $limit);
		}

		public static function insert($row) {
			$fields	= array(
				'title'			=> $row['title'], 
				'description'	=> $row['description'], 
				'url'			=> $row['url']
			);

			return parent::insert(Config::get('db.table_prefix') .'links', $fields);
		}

		public static function update($id, $row) {
			$validFields = array(
				'title', 
				'description', 
				'url'
			);
			$fields = array();

			foreach($row as $col => $val) {
				if(in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return parent::update(Config::get('db.table_prefix') .'links', $id, $fields);
		}

		public static function delete($id) {
			return parent::delete(Config::get('db.table_prefix') .'links', $id);
		}

		public static function makeNice($row) {
			$row['title_plain']			= $row['title'];
			$row['title']				= htmlentities($row['title']);

			$row['description_plain']	= $row['description'];
			$row['description']			= htmlentities($row['description']);

			$row['url_plain']			= $row['url'];
			$row['url']					= htmlentities($row['url']);

			return $row;
		}
	}
?>