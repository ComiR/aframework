<?php
	class Pages extends DBRow {
		public static function getPageByUrlStr($urlStr) {
			$res = dbQry('
				SELECT
					*
				FROM
					' .Config::get('db.table_prefix') .'pages
				WHERE
					url_str = "' .esc($urlStr) .'"
				LIMIT 1
			');

			if(mysql_num_rows($res)) {
				return self::makeNice(mysql_fetch_assoc($res));
			}
			else {
				return false;
			}
		}

		public static function getPagesInNavigation() {
			$res = dbQry('
				SELECT
					*
				FROM
					' .Config::get('db.table_prefix') .'pages
				WHERE
					in_navigation = 1
				ORDER BY
					priority ASC
			');

			if(mysql_num_rows($res)) {
				$rows = array();
				
				while($row = mysql_fetch_assoc($res)) {
					$rows[] = self::makeNice($row);
				}

				return $rows;
			}
			else {
				return false;
			}
		}

		public static function insert($row) {
			$fields		= array(
				'url_str'			=> $row['url_str'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s'), 
				'in_navigation'		=> $row['in_navigation'] ? 1 : 0, 
				'priority'			=> (isset($row['priority']) and is_numeric($row['priority'])) ? $row['priority'] : 0, 
				'title'				=> $row['title'], 
				'meta_keywords'		=> $row['meta_keywords'], 
				'meta_description'	=> $row['meta_description'], 
				'content'			=> $row['content']
			);

			return parent::insert(Config::get('db.table_prefix') .'pages', $fields);
		}

		public static function update($id, $row) {
			$validFields = array(
				'url_str', 
				'pub_date', 
				'in_navigation', 
				'priority', 
				'title', 
				'meta_keywords', 
				'meta_description', 
				'content'
			);
			$fields = array();

			foreach($row as $col => $val) {
				if(in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			parent::update(Config::get('db.table_prefix') .'pages', $id, $fields);
		}

		public static function delete($id) {
			parent::delete(Config::get('db.table_prefix') .'pages', $id);
		}

		private static function makeNice($row) {
			$row['url']						= Router::urlFor('Page', $row);

			$row['content_plain']			= $row['content'];
			$row['content']					= NiceString::makeNice($row['content'], 2, false, false, true);

			$row['title_plain']				= $row['title'];
			$row['title']					= htmlentities($row['title']);

			$row['meta_keywords_plain']		= $row['meta_keywords'];
			$row['meta_keywords']			= htmlentities($row['meta_keywords']);

			$row['meta_description_plain']	= $row['meta_description'];
			$row['meta_description']		= htmlentities($row['meta_description']);

			return $row;
		}
	}
?>