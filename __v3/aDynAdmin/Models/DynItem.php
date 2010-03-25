<?php
	class DynItem {
		public static function getTableColumns ($tableName) {
			$res	= DB::qry('SHOW COLUMNS FROM ' . escSQL($tableName));
			$cols	= array();

			while ($row = mysql_fetch_assoc($res)) {
				$cols[] = $row;
			}

			return $cols;
		}

		public static function getFullTable ($tableName, $sort = '1', $order = 'ASC', $start = 0, $limit = 1000000000, $allowedLangs = false) {
			$res = DB::qry('
				SELECT 
					* 
				FROM 
					' . escSQL($tableName) . ' 
				ORDER BY 
					' . escSQL($sort) . ' ' . escSQL($order) . ' 
				LIMIT ' . escSQL($start) . ', ' . escSQL($limit)
			);

			$i					= 0;
			$tableNameNoLang	= $allowedLangs ? preg_replace('/^(' . implode('|', $allowedLangs) . ')_/', '', $tableName) : $tableName;
			$table	= array(
				'name'			=> $tableName, 
				'title'			=> ucwords(str_replace('_', ' ', $tableNameNoLang)), 
				'rows'			=> array(), 
				'properties'	=> array()
			);

			while ($row = mysql_fetch_assoc($res)) {
				if ($i++ == 0) {
					foreach ($row as $property => $value) {
						$table['properties'][] = array(
							'name'	=> $property, 
							'title'	=> ucwords(str_replace('_', ' ', $property))
						);
					}
				}

				$idColName = $allowedLangs ? preg_replace('/^(' . implode('|', $allowedLangs) . ')_/', '', $tableName) . '_id' : $tableName . '_id';

				$table['rows'][] = array(
					'id'			=> $row[$idColName], 
					'properties'	=> $row
				);
			}

			return $table;
		}

		public static function getTables ($translatedTables = false, $currentLang = false, $allowedLangs = false) {
			# Get all tables
			$res = DB::qry('SHOW TABLES');

			while ($row = mysql_fetch_assoc($res)) {
				$storeTable	= true;
				$tableName	= end($row);

				if ($translatedTables and $currentLang and $allowedLangs) {
					# Remove potential lang-prefix from table name
					$tableNameNoLang = preg_replace('/^(' . implode('|', $allowedLangs) . ')_/', '', $tableName);

					# This is a translated table - remove language code
					# and only store tables that are for the CURRENT_LANG
					if (in_array($tableNameNoLang, $translatedTables)) {
						$tableLang	= substr($tableName, 0, 2);

						if ($tableLang != $currentLang) {
							$storeTable = false;
						}
					}
				}

				if ($storeTable) {
					$tables[] = array(
						'name'			=> $tableName, 
						'name_no_lang'	=> $tableNameNoLang, 
						'title'			=> ucwords(str_replace('_', ' ', $tableNameNoLang)), 
						'selected'		=> isset(Router::$params['table_name']) and Router::$params['table_name'] == $tableNameNoLang ? true : false
					);
				}
			}

			return $tables;
		}

		public static function getEmptyRow ($tableName) {
			$cols	= self::getTableColumns($tableName);
			$row	= array();

			foreach ($cols as $col) {
				$row[$col['Field']] = array(
					'name'			=> $col['Field'], 
					'title'			=> ucwords(str_replace('_', ' ', $col['Field'])), 
					'value'			=> '', 
					'properties'	=> $col
				);
			}

			return $row;
		}

		public static function getByID ($tableName, $id, $allowedLangs = false) {
			$idCol	= $allowedLangs ? preg_replace('/^(' . implode('|', $allowedLangs) . ')_/', '', $tableName) . '_id' : $tableName . '_id';
			$res	= DB::qry('SELECT * FROM ' . escSQL($tableName) . ' WHERE ' . escSQL($idCol) . ' = ' . escSQL($id) . ' LIMIT 1');
			$row	= mysql_fetch_assoc($res);
			$cols	= self::getTableColumns($tableName);
			$nRow	= array();
			$i		= 0;

			foreach ($row as $k => $v) {
				$nRow[$k] = array(
					'name'			=> $k, 
					'title'			=> ucwords(str_replace('_', ' ', $k)), 
					'value'			=> $v, 
					'properties'	=> $cols[$i++]
				);
			}

			return $nRow;
		}

		public static function get ($tableName, $sort = '1', $order = 'ASC', $start = 0, $limit = 10000000) {
			$rows	= DBRow::get($tableName, $sort, $order, $start, $limit);
			$cols	= self::getTableColumns($tableName);
			$nRows	= array();

			foreach ($rows as $rk => $rv) {
				$i = 0;

				foreach ($row as $k => $v) {
					$nRows[$rk][] = array(
						'name'			=> $k, 
						'title'			=> ucwords(str_replace('_', ' ', $k)), 
						'value'			=> $v, 
						'properties'	=> $cols[$i++]
					);
				}
			}

			return $nRows;
		}

		public static function insert ($tableName, $row) {
			return DBRow::insert($tableName, $row);
		}

		public static function update ($tableName, $id, $row) {
			return DBRow::update($tableName, $id, $row);
		}

		public static function delete ($tableName, $id) {
			return DBRow::delete($tableName, $id);
		}
	}
?>
