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
				prefixDBTableNames($qry, Config::get('db.table_prefix'));
			}

			# Prefix selected tables with language IF user isn't using default language
			$translatedTables = explode(',', Config::get('db.translated_tables'));

			if (Config::get('db.translated_tables') and CURRENT_LANG != Config::get('general.default_lang')) {
				prefixDBTableNames($qry, CURRENT_LANG . '_', $translatedTables);
			}

			# Count the number of queries
			self::$numQueries++;

			$res = mysql_query($qry) or die(mysql_error() . '<hr /><pre>' . htmlentities($qry) . '</pre>');

			return $res;
		}

		public static function getNumQueries () {
			return self::$numQueries;
		}
	}
?>
