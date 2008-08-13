<?php
	class Pages {
		public static function getPageByUrlStr($urlStr) {
			return false;

			$res = dbQry('
				SELECT
					*
				FROM
					pages
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
			return false;

			$res = dbQry('
				SELECT
					title, 
					url_str
				FROM
					pages
				WHERE
					in_navigation = 1
				ORDER BY
					priority ASC
			');

			if(mysql_num_rows($res)) {
				$pages = array();
				
				while($row = mysql_fetch_assoc($res)) {
					$pages[] = self::makeNice($row);
				}

				return $pages;
			}
			else {
				return false;
			}
		}

		private static function makeNice($row) {
			return $row;
		}
	}
?>