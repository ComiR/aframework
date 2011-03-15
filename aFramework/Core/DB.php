<?php
	class DB {
		private static $numQueries = 0;
		private static $allTables = array(
			'articles', 
			'article_tags', 
			'comments', 
			'links', 
			'pages', 
			'revisions', 
			'tags', 
			'bt_projects', 
			'bt_sprints', 
			'bt_sprint_tasks', 
			'bt_tasks', 
			'activities', 
			'contact_person_relations', 
			'contact_persons', 
			'sites', 
			'site_reviews', 
			'site_review_comments', 
			'users', 
			'objects', 
			'bids', 
			'offices'
		);

		public static function connect () {
			mysql_connect(Config::get('db.host'), Config::get('db.user'), Config::get('db.pass')) or die('aFramework Error: Unable to connect to MySQL - Please check your config filesfor site: ' . CURRENT_SITE);
			mysql_select_db(Config::get('db.name')) or die('aFramework Error: Unable to select DB - Please check your config files for site: ' . CURRENT_SITE);
		}

		public static function qry ($qry) {
			# Prefix DB table names
			if (Config::get('db.table_prefix')) {
				$qry = self::prefixDBTableNames($qry, Config::get('db.table_prefix'));
			}

			# Prefix selected tables with language
			$translatedTables = explode(',', Config::get('lang.translated_tables'));

			if (Config::get('lang.translated_tables')) {
				$qry = self::prefixDBTableNames($qry, CURRENT_LANG . '_', $translatedTables);
			}

			# Remove potential remaining curly braces from tables
			$qry = self::removeTableCurlyBraces($qry, self::$allTables);

			# Count the number of queries
			self::$numQueries++;

			if (DEBUG) {
				$res = mysql_query($qry) or die(mysql_error() . '<hr /><pre>' . escHTML($qry) . '</pre>');
			}
			else {
				$res = mysql_query($qry);
			}

			return $res;
		}

		public static function getNumQueries () {
			return self::$numQueries;
		}

		# Prefixes table-names in an SQL-query
		public static function prefixDBTableNames ($qry, $prefix, $tables = true) {
			# Prefix certain table names
			if (is_array($tables)) {
				$qry = preg_replace('/([^_])({)(' . implode('|', $tables) . ')(})([^_]|$)/', '$1' . $prefix . '$3$5', $qry);
			}
			# Prefix ALL table names... TODO
			else {
			
			}

			return $qry;
		}

		public static function removeTableCurlyBraces ($qry, $fromTables = true) {
			# Remove braces from certain table names
			if (is_array($fromTables)) {
				$qry = preg_replace('/([^_])({)(' . implode('|', $fromTables) . ')(})([^_]|$)/', '$1$3$5', $qry);
			}
			# Remove braces from ALL table names... TODO
			else {
			
			}

			return $qry;
		}
	}
?>
