<?php
	class SiteReviews {
		public static function thumbUpReview ($id) {
			DB::qry('
				UPDATE
					site_reviews
				SET
					thumbs_up = thumbs_up + 1
				WHERE
					site_reviews_id = ' . escSQL($id) . '
				LIMIT 1
			');
		}

		public static function thumbDownReview ($id) {
			DB::qry('
				UPDATE
					site_reviews
				SET
					thumbs_down = thumbs_down + 1
				WHERE
					site_reviews_id = ' . escSQL($id) . '
				LIMIT 1
			');
		}

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000, $where = '1 = 1') {
			$res = DB::qry('
				SELECT
					site_reviews.*, 
					MD5(site_reviews.email) as email_md5, 
					sites.url_str, 
					IFNULL(thumbs_up, 0) - IFNULL(thumbs_down, 0) as thumb_score
				FROM
					site_reviews
				LEFT JOIN
					sites USING(sites_id)
				GROUP BY
					site_reviews.site_reviews_id
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
			$fields	 = array(
				'sites_id'			=> $row['sites_id'], 
				'karma'				=> SpamChecker::getKarma($row), 
				'ip'				=> $_SERVER['REMOTE_ADDR'], 
				'author'			=> $row['author'], 
				'email'				=> $row['email'], 
				'website'			=> $row['website'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s'), 
				'rating'			=> (isset($row['rating']) and $row['rating'] > 0 and $row['rating'] < 6) ? $row['rating'] : 3, 
				'thumbs_up'			=> 0, 
				'thumbs_down'		=> 0
			);

			return DBRow::insert('site_reviews', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'articles_id', 
				'karma', 
				'author', 
				'email', 
				'website', 
				'content', 
				'pub_date', 
				'rating', 
				'thumbs_up', 
				'thumbs_down'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('site_reviews', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('site_reviews', $id);
		}
	}
?>
