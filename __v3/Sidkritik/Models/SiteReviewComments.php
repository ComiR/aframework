<?php
	class SiteReviewComments {
		public static function getBySiteReviewsID ($id) {
			$res = DB::qry('
				SELECT
					*, 
					MD5(email) AS email_md5
				FROM
					site_review_comments
				WHERE
					site_reviews_id = ' . escSQL($id) . '
				ORDER BY
					pub_date ASC
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
			return DBRow::get('site_review_comments', $sort, $order, $start, $limit);
		}

		public static function insert ($row) {
			$fields	= array(
				'site_reviews_id'	=> $row['site_reviews_id'], 
				'karma'				=> isset($row['karma']) ? $row['karma'] : SpamChecker::getKarma($row), 
				'ip'				=> $_SERVER['REMOTE_ADDR'], 
				'pub_date'			=> date('Y-m-d H:i:s'), 
				'email'				=> $row['email'], 
				'content'			=> $row['content']
			);

			return DBRow::insert('site_review_comments', $fields);
		}

		public static function update ($id, $row) {			
			$validFields = array(
				'site_reviews_id', 
				'karma', 
				'ip', 
				'email', 
				'content'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('site_review_comments', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('site_review_comments', $id);
		}
	}
?>
