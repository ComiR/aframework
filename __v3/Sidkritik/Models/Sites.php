<?php
	class Sites {
		private static $validFields = array(
			'author', 
			'email', 
			'title', 
			'content', 
			'thumb_url', 
			'url', 
			'url_str', 
			'pub_date'
		);

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000, $where = '1 = 1') {
			$res = DB::qry('
				SELECT
					sites.*, 
					COUNT(site_reviews_id) AS num_reviews, 
					MD5(sites.email) AS email_md5, 
					SUM(rating) AS total_rating, 
					SUM(rating) / COUNT(site_reviews_id) AS avg_rating
				FROM
					sites
				LEFT JOIN
					site_reviews USING(sites_id)
				GROUP BY
					sites.sites_id
				HAVING
					' . $where . '
				ORDER BY
					' . escSQL($sort) . ' ' . escSQL($order) . '
				LIMIT
					' . escSQL($start) . ', ' . escSQL($limit)
			);

			if (mysql_num_rows($res) === 1) {
				return $limit === 1 ? mysql_fetch_assoc($res) : array(mysql_fetch_assoc($res));
			}
			elseif (mysql_num_rows($res) > 1) {
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

		public static function insert ($row) {
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, self::$validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::insert('sites', $fields);
		}

		public static function update ($id, $row) {
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, self::$validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('sites', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('sites', $id);
		}
	}
?>
