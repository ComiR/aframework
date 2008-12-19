<?php
	class Comments extends DBRow {
		private static $mhl;

		public static function get($sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000, $mhl = 3) {
			self::$mhl = $mhl;

			return parent::get(Config::get('db.table_prefix') .'comments', $sort, $order, $start, $limit);
		}

		public static function insert($row) {
			$fields	 = array(
				'articles_id'		=> $row['articles_id'], 
				'spam'				=> SpamChecker::isSpam($row), 
				'ip'				=> $_SERVER['REMOTE_ADDRESS'], 
				'author'			=> $row['author'], 
				'email'				=> $row['email'], 
				'website'			=> $row['website'], 
				'content'			=> $row['content'], 
				'pub_date'			=> isset($row['pub_date']) ? $row['pub_date'] : date('Y-m-d H:i:s')
			);

			return parent::insert(Config::get('db.table_prefix') .'comments', $fields);
		}

		public static function update($id, $row) {
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

			foreach($row as $col => $val) {
				if(in_array($col, $validFields)) {
					$fields[$col] = $val;
				}
			}

			parent::update(Config::get('db.table_prefix') .'comments', $id, $fields);
		}

		public static function delete($id) {
			parent::delete(Config::get('db.table_prefix') .'comments', $id);
		}

		public static function makeNice($row) {
			$row['article_url']				= Router::urlFor('Article', $row); # should be articleRow fffs this wont work at all!
			$row['url']						= $row['article_url'] .'#comment-' .$row['comments_id'];

			$row['content_plain']			= $row['content'];
			$row['content']					= NiceString::makeNice($row['content_plain'], self::$mhl, false, false, true);
			$row['content_more_cut']		= NiceString::makeNice($row['content_plain'], self::$mhl, true, false, true);
			$row['content_excerpt']			= NiceString::makeNice($row['content_plain'], self::$mhl, false, Config::get('general.excerpt_length'), true);

			return $row;
		}
	}
?>