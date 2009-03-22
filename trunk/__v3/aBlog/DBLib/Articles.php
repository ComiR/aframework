<?php
	class Articles {
		public static function getArticlesByPubDate ($pubDate) {
			if (!is_numeric($pubDate)) {
				return false;
			}

			if (strlen($pubDate) == 4) {
				$dateFormatA	= '%Y';
				$dateFormatB	= '%Y';
				$date			= date('Y', mktime(0, 0, 0, 1, 1, $pubDate));
			}
			elseif (strlen($pubDate) == 6) {
				$dateFormatA	= '%Y%m';
				$dateFormatB	= '%M %Y';
				$date			= date('F Y', mktime(0, 0, 0, substr($pubDate, 4, 2), 1, substr($pubDate, 0, 4)));
			}
			elseif (strlen($pubDate) == 8) {
				$dateFormatA	= '%Y%m%d';
				$dateFormatB	= '%W, %M %D, %Y';
				$date			= date('l, F jS, Y', mktime(0, 0, 0, substr($pubDate, 4, 2), substr($pubDate, 6, 2), substr($pubDate, 0, 4)));
			}
			else {
				return false;
			}

			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'articles.*, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "' . $dateFormatA . '") AS compare_date, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "' . $dateFormatB . '") AS show_date,
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					COUNT(comments_id) as num_comments
				FROM 
					' . Config::get('db.table_prefix') . 'articles 
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'comments USING(articles_id)
				GROUP BY
					' . Config::get('db.table_prefix') . 'articles.articles_id
				HAVING
					' . Config::get('db.table_prefix') . 'articles.pub_date <= CURDATE() AND 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "' . $dateFormatA . '") = ' . $pubDate . '
				ORDER BY 
					' . Config::get('db.table_prefix') . 'articles.pub_date DESC
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

		public static function getArticlesByTagURLStr ($urlStr) {
			/*$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'articles.*, 
					' . Config::get('db.table_prefix') . 'tags.url_str AS tags_url_str, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					COUNT(comments_id) as num_comments
				FROM
					' . Config::get('db.table_prefix') . 'articles
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'article_tags USING(articles_id)
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'comments USING(articles_id)
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'tags USING(tags_id)
				GROUP BY
					' . Config::get('db.table_prefix') . 'articles.articles_id
				HAVING
					' . Config::get('db.table_prefix') . 'articles.pub_date <= CURDATE() AND 
					tags_url_str = "' . esc($urlStr) . '"
				ORDER BY
					articles.pub_date DESC
			');*/
			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'articles.*, 
					' . Config::get('db.table_prefix') . 'tags.url_str, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					COUNT(comments_id) as num_comments
				FROM
					' . Config::get('db.table_prefix') . 'articles
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'article_tags USING(articles_id)
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'comments USING(articles_id)
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'tags USING(tags_id)
				WHERE
					' . Config::get('db.table_prefix') . 'articles.pub_date <= CURDATE() AND 
					tags.url_str = "' . esc($urlStr) . '"
				GROUP BY
					' . Config::get('db.table_prefix') . 'articles.articles_id
				ORDER BY
					articles.pub_date DESC
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

		public static function getArticleByURLStr ($urlStr) {
			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'articles.*, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					COUNT(comments_id) as num_comments
				FROM
					' . Config::get('db.table_prefix') . 'articles
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'comments USING(articles_id)
				GROUP BY
					' . Config::get('db.table_prefix') . 'articles.articles_id
				HAVING
					' . Config::get('db.table_prefix') . 'articles.pub_date <= CURDATE() AND 
					' . Config::get('db.table_prefix') . 'articles.url_str = "' . esc($urlStr) . '"
				LIMIT 1
			');

			if (mysql_num_rows($res)) {
				return mysql_fetch_assoc($res);
			}
			else {
				return false;
			}
		}

		public static function get ($sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000) {
			$res = dbQry('
				SELECT
					' . Config::get('db.table_prefix') . 'articles.*, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%Y") AS year, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%m") AS month, 
					DATE_FORMAT(' . Config::get('db.table_prefix') . 'articles.pub_date, "%d") AS day, 
					COUNT(comments_id) as num_comments
				FROM
					' . Config::get('db.table_prefix') . 'articles
				LEFT JOIN
					' . Config::get('db.table_prefix') . 'comments USING(articles_id)
				GROUP BY
					' . Config::get('db.table_prefix') . 'articles.articles_id
				HAVING
					' . Config::get('db.table_prefix') . 'articles.pub_date <= CURDATE()
				ORDER BY
					' . Config::get('db.table_prefix') . 'articles.' . esc($sort) . ' ' . esc($order) . '
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
				'url_str'			=> $row['url_str'], 
				'title'				=> $row['title'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s'), 
				'allow_comments'	=> $row['allow_comments'] ? 1 : 0, 
				'allow_rating'		=> $row['allow_rating'] ? 1 : 0, 
				'meta_keywords'		=> $row['meta_keywords'], 
				'meta_description'	=> $row['meta_description'], 
				'num_hits'			=> 0
			);

			return DBRow::insert(Config::get('db.table_prefix') . 'articles', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'url_str', 
				'formatting', 
				'title', 
				'content', 
				'pub_date', 
				'allow_comments', 
				'allow_rating', 
				'meta_keywords', 
				'meta_description', 
				'num_hits'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update(Config::get('db.table_prefix') . 'articles', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete(Config::get('db.table_prefix') . 'articles', $id);
		}
	}
?>