<?php
	class SiteReviewComments {
		public static function getBySiteReviewsID ($id) {
			return self::get('pub_date', 'ASC', 0, 1, 'site_reviews_id = ' . escSQL($id), 'MD5(email) AS email_md5');
		}

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1') {
			return DBRow::get('site_review_comments', $sort, $order, $start, $limit, $where, $select);
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
