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

		private static function makeNice($row) {
			$row['title']				= htmlentities($row['title']);
			$row['title_plain']			= $row['title'];

			$row['description']			= htmlentities($row['description']);
			$row['description_plain']	= $row['description'];

			$row['url']					= htmlentities($row['url']);
			$row['url_plain']			= $row['url'];

			return $row;
		}
	}
?>