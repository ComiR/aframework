<?php
	class DynItem {
		public static function getTableColumns ($tableName) {
			$res	= DB::qry('SHOW COLUMNS FROM ' . esc($tableName));
			$cols	= array();

			while ($row = mysql_fetch_assoc($res)) {
				$cols[] = $row;
			}

			return $cols;
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

		public static function getByID ($tableName, $id) {
			$res	= DB::qry('SELECT * FROM ' . esc($tableName) . ' WHERE ' . esc($tableName) . '_id = ' . esc($id) . ' LIMIT 1');
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
