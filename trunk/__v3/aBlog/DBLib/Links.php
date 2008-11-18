<?php
	class Links{
		public static function getLinks() {
			$res = dbQry('
				SELECT
					*
				FROM
					' .Config::get('db.table_prefix') .'links
				ORDER BY
					title ASC
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
			dbQry('
				INSERT INTO ' .Config::get('db.table_prefix') .'links (
					title, 
					description, 
					url
				)
				VALUES (
					\'' .esc($row['title']) .'\', 
					\'' .esc($row['description']) .'\', 
					\'' .esc($row['url']) .'\'
				)
			');

			return mysql_insert_id();
		}

		public static function update($row) {

		}

		public static function delete($id) {
			dbQry('DELETE FROM links WHERE links_id = ' .esc($id));
		}

		private static function makeNice($row) {
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
