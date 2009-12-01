<?php
	class Tags {
		public static function getTagsByArticlesID ($articlesID) {
			if (is_numeric($articlesID)) {
				$res = DB::qry('
					SELECT
						tags.*
					FROM
						article_tags
					LEFT JOIN
						tags USING(tags_id)
					WHERE
						articles_id = ' . $articlesID
				);

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
		}

		public static function get ($sort = 'title', $order = 'ASC', $start = 0, $limit = 10000000) {
			$res = DB::qry('
				SELECT
					tags.*, 
					COUNT(articles_id) as num_articles
				FROM
					tags
				LEFT JOIN
					article_tags USING(tags_id)
				GROUP BY
					tags.tags_id
				ORDER BY
					tags.' . esc($sort) . ' ' . esc($order) . '
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
			$fields	= array(
				'title' => $row['title']
			);

			return DBRow::insert('tags', $fields);
		}

		public static function update ($id, $row) {
			$validFields = array(
				'title'
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
