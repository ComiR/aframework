<?php
	class Pages {
		public static function getPageByURLStr ($urlStr) {
			$res = DB::qry('
				SELECT
					*
				FROM
					pages
				WHERE
					url_str LIKE BINARY "' . escSQL($urlStr) . '"
				LIMIT 1
			');

			if (mysql_num_rows($res)) {
				return mysql_fetch_assoc($res);
			}
			else {
				return false;
			}
		}

		public static function getPagesInNavigation () {
			$res = DB::qry('
				SELECT
					*
				FROM
					pages
				WHERE
					in_navigation = 1
				ORDER BY
					priority ASC
			');

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

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000) {
			return DBRow::get('pages', $sort, $order, $start, $limit);
		}

		public static function insert ($row) {
			$fields	= array(
				'url_str'			=> $row['url_str'], 
				'in_navigation'		=> $row['in_navigation'] ? 1 : 0, 
				'priority'			=> (isset($row['priority']) and is_numeric($row['priority'])) ? $row['priority'] : 0, 
				'title'				=> $row['title'], 
				'meta_keywords'		=> @$row['meta_keywords'], 
				'meta_description'	=> @$row['meta_description'], 
				'content'			=> $row['content']
			);

			$fields['id'] = DBRow::insert('pages', $fields);

			Revisions::insert(array(
				'table_id'		=> $fields['id'], 
				'table_name'	=> 'pages', 
				'pub_date'		=> date('Y-m-d H:i:s'), 
				'content'		=> $fields['content']
			));

			return $fields['id'];
		}

		public static function update ($id, $row) {
			$validFields = array(
				'url_str', 
				'in_navigation', 
				'priority', 
				'title', 
				'meta_keywords', 
				'meta_description', 
				'content'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			Revisions::insert(array(
				'table_id'		=> $id, 
				'table_name'	=> 'pages', 
				'pub_date'		=> date('Y-m-d H:i:s'), 
				'content'		=> $fields['content']
			));

			return DBRow::update('pages', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('pages', $id);
		}
	}
?>
