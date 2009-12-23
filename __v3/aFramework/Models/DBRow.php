<?php
	class DBRow {
		public static function get ($tableName, $sort = 'pub_date', $order = 'DESC', $start = 0, $limit = 10000000) {
			$res = DB::qry('
				SELECT
					*
				FROM
					' . $tableName . '
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

		public static function insert ($tableName, $fields) {
			$insertVals = '';
			$insertCols = '';

			foreach ($fields as $col => $val) {
				$insertVals .= '\'' .escSQL($val) .'\',';
				$insertCols .= $col .',';
			}

			$insertVals = substr($insertVals, 0, -1);
			$insertCols = substr($insertCols, 0, -1);

			DB::qry("
				INSERT INTO
					$tableName (
						$insertCols
					)
				VALUES (
					$insertVals
				)
			");

			return mysql_insert_id();
		}

		public static function update ($tableName, $id, $fields) {
			$updateStr = '';

			foreach ($fields as $col => $val) {
				$updateStr .= "$col = '" .escSQL($val) ."',";
			}

			$updateStr = substr($updateStr, 0, -1);

			DB::qry("
				UPDATE
					$tableName
				SET
					$updateStr
				WHERE
					{$tableName}_id = " . escSQL($id) . "
				LIMIT 1
			");

			return true;
		}
		
		public static function delete ($tableName, $id) {
			DB::qry("
				DELETE FROM
					$tableName
				WHERE
					{$tableName}_id = " . escSQL($id) . "
				LIMIT 1
			");

			return true;
		}
	}
?>
