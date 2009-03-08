<?php
	class Articles extends DBRow {
		private static $mhl;

		public static function getArticleByUrlStr($urlStr, $mhl = 3) {
			self::$mhl = $mhl;

			$res = dbQry('
				SELECT
					*
				FROM
					' .Config::get('db.table_prefix') .'articles
				WHERE
					url_str = "' .esc($urlStr) .'"
				LIMIT 1
			');

			if(mysql_num_rows($res)) {
				return self::makeNice(mysql_fetch_assoc($res));
			}
			else {
				return false;
			}
		}

		public static function get($sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000, $mhl = 3) {
			self::$mhl = $mhl;

			return parent::get(Config::get('db.table_prefix') .'articles', $sort, $order, $start, $limit);
		}

		public static function insert($row) {
			$fields	 = array(
				'url_str'			=> $row['url_str'], 
				'title'				=> $row['title'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s'), 
				'allow_comments'	=> $row['allow_comments'], 
				'allow_rating'		=> $row['allow_rating'], 
				'meta_keywords'		=> $row['meta_keywords'], 
				'meta_description'	=> $row['meta_description'], 
				'num_hits'			=> $row['num_hits']
			);

			return parent::insert(Config::get('db.table_prefix') .'articles', $fields);
		}

		public static function update($id, $row) {
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

			foreach($row as $col => $val) {
				if(in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			parent::update(Config::get('db.table_prefix') .'articles', $id, $fields);
		}

		public static function delete($id) {
			parent::delete(Config::get('db.table_prefix') .'articles', $id);
		}

		public static function makeNice($row) {
			$row['url']						= Router::urlFor('Article', $row);

			$row['content_plain']			= $row['content'];
			$row['content']					= NiceString::makeNice($row['content_plain'], self::$mhl, false, false, true);
			$row['content_more_cut']		= NiceString::makeNice($row['content_plain'], self::$mhl, true, false, true);
			$row['content_excerpt']			= NiceString::makeNice($row['content_plain'], self::$mhl, false, Config::get('general.excerpt_length'), true);

			$row['title_plain']				= $row['title'];
			$row['title']					= htmlentities($row['title']);

			$row['meta_keywords_plain']		= $row['meta_keywords'];
			$row['meta_keywords']			= htmlentities($row['meta_keywords']);

			$row['meta_description_plain']	= $row['meta_description'];
			$row['meta_description']		= htmlentities($row['meta_description']);

			return $row;
		}
	}
?>
