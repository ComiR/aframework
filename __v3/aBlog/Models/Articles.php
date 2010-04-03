<?php
	class Articles {
		public static function getPrevious ($date) {
			return self::get('pub_date', 'DESC', 0, 1, 'DATE_FORMAT({articles}.pub_date, "%Y-%m-%d") < "' . $date . '"');
		}

		public static function getNext ($date) {
			return self::get('pub_date', 'ASC', 0, 1, 'DATE_FORMAT({articles}.pub_date, "%Y-%m-%d") > "' . $date . '"');
		}

		public static function getGroupedByWeek ($month, $year) {
			
		}

		public static function getGroupedByMonth () {
			$articles	= self::get('pub_date', 'DESC');
			$dates		= array();
			$currDate	= false;

			if (is_array($articles)) {
				foreach ($articles as $a) {
					$monthYear = date('F Y', strtotime($a['pub_date']));

					if ($currDate === false or $currDate != $monthYear) {
						$currDate = $monthYear;

						$dates[$monthYear] = array(
							'month_year'	=> $monthYear, 
							'year'			=> date('Y', strtotime($a['pub_date'])), 
							'month'			=> date('m', strtotime($a['pub_date']))
						);
					}

					$dates[$monthYear]['articles'][] = $a;
				}
			}

			return count($dates) ? $dates : false;
		}

		public static function getByPubDate ($pubDate, $future = false) {
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

			return self::get(
							'pub_date', 
							'DESC', 
							0, 
							INFINITY, 
							'DATE_FORMAT({articles}.pub_date, "' 
								. $dateFormatA 
								. '") = "' 
								. $pubDate 
								.'"', 
							'DATE_FORMAT({articles}.pub_date, "' 
								. $dateFormatA 
								. '") AS compare_date, DATE_FORMAT({articles}.pub_date, "' 
								. $dateFormatB . '") AS show_date'
					);
		}

		public static function getByTagURLStr ($urlStr, $future = false) {
			return self::get('pub_date', 'DESC', 0, INFINITY, '{tags}.url_str LIKE BINARY "' . escSQL($urlStr) . '"');
		}

		public static function getByURLStr ($urlStr) {
			return self::get('1', 'ASC', 0, 1, '{articles}.url_str LIKE BINARY "' . escSQL($urlStr) . '"');
		}

		public static function getByID ($id) {
			return self::get('1', 'ASC', 0, 1, '{articles}.articles_id = ' . escSQL($id));
		}

		public static function getImages () {
			$articles	= self::get('pub_date', 'DESC');
			$matches	= array();
			$images		= array();

			foreach ($articles as $article) {
				if (preg_match_all('/!\[(.*?)\]\((.*?)\)/', $article['content'], $matches)) {
					foreach ($matches[0] as $k => $v) {
						$src		= $matches[2][$k];
						$srcThumb	= substr($src, 0, 4) == 'http' ? $src : DOCROOT . $src;

						$images[] = array(
							'title'		=> ucwords(str_replace(array('-', '.jpg', '.gif', '.png'), array(' ', ''), basename($src))),
							'src'		=> $src,
							'src_thumb'	=> WEBROOT . 'aFramework/Lib/phpThumb/phpThumb.php?src=' . $srcThumb . '&amp;w=160', 
							'article'	=> $article
						);
					}
				}
			}

			return count($images) ? $images : false;
		}

		public static function get ($sort = '1', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1', $having = '1 = 1') {
			$having .= ADMIN ? '' : " AND {articles}.pub_date <= NOW()";

			$res = DB::qry('
				SELECT
					{articles}.*, 
					DATE_FORMAT({articles}.pub_date, "%Y") AS year, 
					DATE_FORMAT({articles}.pub_date, "%m") AS month, 
					DATE_FORMAT({articles}.pub_date, "%d") AS day, 
					IF({articles}.pub_date > NOW(), 1, 0) AS future, 
					{tags}.url_str AS tags_url_str, 
					COUNT(DISTINCT(comments_id)) AS num_comments, 
					COUNT(DISTINCT(tags_id)) AS num_tags, 
					SUM(IF({comments}.karma > 0, 1, 0)) AS num_not_spam, 
					{tags}.url_str AS tags_url_str, 
					' . $select . '
				FROM
					{articles}
				LEFT JOIN
					{comments} USING(articles_id)
				LEFT JOIN
					{article_tags} USING(articles_id)
				LEFT JOIN
					{tags} USING(tags_id)
				WHERE
					' . $where . '
				GROUP BY
					{articles}.articles_id
				HAVING
					' . $having . '
				ORDER BY
					' . escSQL($sort) . ' ' . escSQL($order) . '
				LIMIT
					' . escSQL($start) . ', ' . escSQL($limit)
			);

			if (mysql_num_rows($res) === 1) {
				$row = mysql_fetch_assoc($res);

				$numTagsNotZero			= $row['num_tags'] ? $row['num_tags'] : 1;
				$row['num_comments']	= ADMIN ? $row['num_comments'] : $row['num_not_spam'] / $numTagsNotZero;

				return $limit === 1 ? $row : array($row);
			}
			elseif (mysql_num_rows($res) > 1) {
				$rows = array();

				while ($row = mysql_fetch_assoc($res)) {
					$numTagsNotZero			= $row['num_tags'] ? $row['num_tags'] : 1;
					$row['num_comments']	= ADMIN ? $row['num_comments'] : $row['num_not_spam'] / $numTagsNotZero;

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
				'pub_date'			=> (isset($row['pub_date']) and strlen($row['pub_date'])) ? $row['pub_date'] : date('Y-m-d H:i:s'), 
				'allow_comments'	=> $row['allow_comments'] ? 1 : 0, 
				'allow_rating'		=> $row['allow_rating'] ? 1 : 0, 
				'meta_keywords'		=> $row['meta_keywords'], 
				'meta_description'	=> $row['meta_description'], 
				'num_hits'			=> 0
			);

			$fields['id'] = DBRow::insert('articles', $fields);

			Revisions::insert(array(
				'table_id'		=> $fields['id'], 
				'table_name'	=> 'articles', 
				'pub_date'		=> date('Y-m-d H:i:s'), 
				'content'		=> $fields['content']
			));

			return $fields['id'];
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

			Revisions::insert(array(
				'table_id'		=> $id, 
				'table_name'	=> 'articles', 
				'pub_date'		=> date('Y-m-d H:i:s'), 
				'content'		=> $fields['content']
			));

			return DBRow::update('articles', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('articles', $id);
		}
	}
?>
