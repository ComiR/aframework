<?php
	class DB {
		private static $numQueries = 0;

		public static function connect () {
			mysql_connect(Config::get('db.host'), Config::get('db.user'), Config::get('db.pass')) or die('aFramework Error: Unable to connect to MySQL - Please check your config files');
			mysql_select_db(Config::get('db.name')) or die('aFramework Error: Unable to select DB - Please check your config files');
		}

		public static function qry ($qry) {
			# Prefix DB table names
			if (Config::get('db.table_prefix')) {
				$qry = self::prefixDBTableNames($qry, Config::get('db.table_prefix'));
			}

			# Prefix selected tables with language
			$translatedTables = explode(',', Config::get('db.translated_tables'));

			if (Config::get('db.translated_tables')) {
				$qry = self::prefixDBTableNames($qry, CURRENT_LANG . '_', $translatedTables);
			}

			# Count the number of queries
			self::$numQueries++;

			$res = mysql_query($qry) or die(mysql_error() . '<hr /><pre>' . escHTML($qry) . '</pre>');

			return $res;
		}

		public static function getNumQueries () {
			return self::$numQueries;
		}

		# Prefixes table-names in an SQL-query
		public static function prefixDBTableNames ($qry, $prefix, $tables = true) {
			# Prefix certain tables
			if (is_array($tables)) {
				$qry = preg_replace('/([^_])(' . implode('|', $tables) . ')([^_]|$)/', '$1' . $prefix . '$2$3', $qry);
			#	foreach ($tables as $table) {
			#		$qry = preg_replace('/([^_])(' . $table . ')([^_])/', '$1' . $prefix . '$2$3', $qry);
			#	}
			}
			# Prefix ALL tables... TODO
			else {
			
			}

			return $qry;
		}
	}
?>
