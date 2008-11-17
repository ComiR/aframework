<?php
	class Pages {
		public static function getPageByUrlStr($urlStr) {
			$res = dbQry('
				SELECT
					*
				FROM
					' .Config::get('db.table_prefix') .'pages
				WHERE
					url_str = "' .escape($urlStr) .'"
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
			$pubDate	= isset($row['pub_date']) ? $row['pub_date'] : time();
			$inNav		= $row['in_navigation'] ? true : false;

			dbQry('
				INSERT INTO
					pages
				VALUES (
					"", 
					"' .esc($row['url_str']) .'", 
					"' .esc($pubDate) .'", 
					"' .esc($inNav) .'", 
					"' .esc($row['priority']) .'", 
					"' .esc($row['title']) .'", 
					"' .esc($row['meta_keywords']) .'", 
					"' .esc($row['meta_description']) .'", 
					"' .esc($row['content']) .'"
				)
			');

			return mysql_insert_id();
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
