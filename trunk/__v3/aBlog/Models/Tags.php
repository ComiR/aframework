<?php
	class Tags {
		public static function deleteTagsForArticle ($articlesID) {
			DB::qry('DELETE FROM article_tags WHERE articles_id = ' . escSQL($articlesID));
		}

		public static function updateTagsForArticle ($articlesID, $tags) {
			$tags		= is_array($tags) ? $tags : explode(',', $tags);
			$tags		= array_map('trim', $tags);
			$tags		= array_unique($tags);
			$tags		= array_filter($tags);
			$tagsArr	= array();

			# No tags, delete all old tags for this article
			if (!count($tags)) {
				DB::qry('DELETE FROM article_tags WHERE articles_id = ' . escSQL($articlesID));

				return;
			}

			# Insert new tags
			foreach ($tags as $tag) {
				if (!mysql_num_rows(DB::qry('SELECT tags_id FROM tags WHERE title = "' . escSQL($tag) . '"'))) {
					Tags::insert(array(
						'url_str'	=> Router::urlize($tag), 
						'title'		=> $tag
					));
				}
			}

			# Grab all the tags for this article's IDs
			$res = DB::qry('SELECT tags_id FROM tags WHERE title IN ("' . implode('","', $tags) . '")');
			$ids = array();

			while ($row = mysql_fetch_assoc($res)) {
				$ids[] = $row;
			}

			# Delete all old tags for this article
			self::deleteTagsForArticle($articlesID);

			# Insert the new ones
			foreach ($ids as $id) {
				DBRow::insert('article_tags', array(
					'articles_id'	=> $articlesID, 
					'tags_id'		=> $id['tags_id']
				));
			}
		}

		public static function getByArticlesID ($articlesID) {
			return self::get('1', 'ASC', 0, INFINITY, 'articles_id = ' . escSQL($articlesID));
		}

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = INFINITY, $where = '1 = 1', $select = '1', $having = '1 = 1') {
			$res = DB::qry('
				SELECT
					tags.*, 
					COUNT(DISTINCT(articles_id)) as num_articles, 
					' . $select . '
				FROM
					tags
				LEFT JOIN
					article_tags USING(tags_id)
				WHERE
					' . $where . '
				GROUP BY
					tags.tags_id
				HAVING
					' . $having . '
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
			$fields	= array(
				'title' 	=> $row['title'], 
				'url_str'	=> isset($row['url_str']) ? Router::urlize($row['url_str']) : Router::urlize($row['title'])
			);

			return DBRow::insert('tags', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title', 
				'url_str'
			);
			$fields = array();

			foreach ($row as $col => $val) {
				if (in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			return DBRow::update('tags', $id, $fields);
		}

		public static function delete ($id) {
			return DBRow::delete('tags', $id);
		}
	}
?>
