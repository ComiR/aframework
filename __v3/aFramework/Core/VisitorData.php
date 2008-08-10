<?php
	/**
	 * VisitorData
	 *
	 * Stores and retrieves visitor data
	 **/
	final class VisitorData {
		public static function run() {
			if(isset($_REQUEST['remember_visitor_data']) and $_REQUEST['remember_visitor_data']) {
				self::set($_REQUEST);
			}
		}

		public static function getVisitorData() {
			$data = false;

			if(isset($_COOKIE['visitor_data'])) {
				$data = unserialize(stripslashes($_COOKIE['visitor_data']));
				$data['remembered'] = true;
			}

			return $data;
		}

		private static function setVisitorData($data) {
			$validData = array('name', 'email', 'url', 'tel');
			$oldData = (array)self::getVisitorData();
			$set = array();

			foreach($data as $k => $v) {
				if(in_array($k, $validData)) {
					$set[$k] = $v;
				}
			}

			setcookie('visitor', serialize(array_merge($oldData, $set)), time() + 31536000, BASE_PATH .'/');
		}
	}
?>