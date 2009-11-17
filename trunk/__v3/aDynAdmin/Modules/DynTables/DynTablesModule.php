<?php
	class aDynAdmin_DynTablesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!ADMIN) {
				FourOFour::run();
			}

			aFramework_BaseModule::$tplVars['style'] = 'dynadmin';

			$res = dbQry('SHOW TABLES');

			while ($row = mysql_fetch_assoc($res)) {
				$tableName = end($row);

				self::$tplVars['tables'][] = array(
					'name'		=> $tableName, 
					'title'		=> ucwords(str_replace('_', ' ', $tableName)), 
					'selected'	=> isset(Router::$params['table_name']) and Router::$params['table_name'] == $tableName ? true : false
				);
			}
		}
	}
?>
