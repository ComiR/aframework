<?php
	class Comments {
		public static function getCommentsByArticleID ($id) {
			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'comments.*, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					articles.url_str, 
					articles.title AS article_title, 
					MD5(comments.email) AS email_md5
				FROM
					' . Config::get('db.table_prefix') . 'comments
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'articles USING(articles_id)
				WHERE
					articles_id = "' . esc($id) . '"
				ORDER BY
					' . Config::get('db.table_prefix') . 'comments.pub_date ASC
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

		public static function getCommentsByArticleURLStr ($urlStr) {
			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'comments.*, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					articles.url_str, 
					articles.title AS article_title, 
					MD5(comments.email) AS email_md5
				FROM
					' . Config::get('db.table_prefix') . 'comments
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'articles USING(articles_id)
				WHERE
					url_str = "' . esc($urlStr) . '"
				ORDER BY
					' . Config::get('db.table_prefix') . 'comments.pub_date ASC
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

		public static function get ($sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000) {
			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'comments.*, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					articles.url_str, 
					articles.title AS article_title, 
					MD5(comments.email) AS email_md5
				FROM
					' . Config::get('db.table_prefix') . 'comments
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'articles USING(articles_id)
				ORDER BY
					' . Config::get('db.table_prefix') . 'comments.' . esc($sort) . ' ' . esc($order) . '
				LIMIT
					' . esc($start) . ', ' . esc($limit)
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
				'articles_id'		=> $row['articles_id'], 
				'spam'				=> SpamChecker::isSpam($row) ? 1 : 0, 
				'ip'				=> $_SERVER['REMOTE_ADDR'], 
				'author'			=> $row['author'], 
				'email'				=> $row['email'], 
				'website'			=> $row['website'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s')
			);

			return DBRow::insert(Config::get('db.table_prefix') . 'comments', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'articles_id', 
				'spam', 
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

			return DBRow::update(Config::get('db.table_prefix') . 'comments', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete(Config::get('db.table_prefix') . 'comments', $id);
		}
	}
?>