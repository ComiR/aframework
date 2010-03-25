<?php
	class Comments {
		public static function deleteAllSpamForArticle ($articlesID) {
			DB::qry('DELETE FROM comments WHERE articles_id = ' . escSQL($articlesID) . ' AND karma < 1');
		}

		public static function deleteCommentsForArticle ($articlesID) {
			DB::qry('DELETE FROM comments WHERE articles_id = ' . escSQL($articlesID));
		}

		public static function getCommentsByArticleID ($id, $spam = false) {
			return self::get('pub_date', 'ASC', 0, 10000000000, $spam, 'articles.articles_id = "' . escSQL($id) . '"');
		}

		public static function getCommentsByArticleURLStr ($urlStr, $spam = false) {
			return self::get('pub_date', 'DESC', 0, 10000000000, $spam, 'articles.url_str LIKE BINARY "' . escSQL($urlStr) . '"');
		}

		public static function get ($sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000, $spam = false, $where = '1 = 1', $select = '1') {
			$where .= $spam ? '' : ' AND comments.karma > 0';

			$res = DB::qry('
				SELECT
					comments.*, 
					DATE_FORMAT(articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(articles.pub_date, "%m") AS month, 
					DATE_FORMAT(articles.pub_date, "%d") AS day, 
					articles.url_str, 
					articles.title AS article_title, 
					MD5(comments.email) AS email_md5, 
					' . $select . '
				FROM
					comments
				LEFT JOIN
					articles USING(articles_id)
				WHERE
					' . $where . '
				ORDER BY
					comments.' . escSQL($sort) . ' ' . escSQL($order) . '
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
			$fields = array(
				'articles_id'		=> $row['articles_id'], 
				'karma'				=> SpamChecker::getKarma($row), 
				'ip'				=> $_SERVER['REMOTE_ADDR'], 
				'author'			=> $row['author'], 
				'email'				=> $row['email'], 
				'website'			=> $row['website'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s')
			);

			return DBRow::insert('comments', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'articles_id', 
				'karma', 
				'author', 
				'email', 
				'website', 
				'content', 
				'pub_date'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('comments', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('comments', $id);
		}
	}
?>
