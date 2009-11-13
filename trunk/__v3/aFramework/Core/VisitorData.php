<?php
	/**
	 * VisitorData
	 *
	 * Stores and retrieves visitor data
	 **/
	final class VisitorData {
		public static function run () {
			if (isset($_POST['remember_visitor_data']) and $_POST['remember_visitor_data']) {
				self::setVisitorData($_POST);
			}
		}

		public static function getVisitorData () {
			$data = false;

			if (isset($_COOKIE['visitor_data'])) {
				$data = unserialize(stripslashes($_COOKIE['visitor_data']));
				$data['remembered'] = true;
			}

			return $data;
		}

		private static function setVisitorData ($data) {
			$validData	= array('name', 'email', 'url', 'tel', 'author');
			$convert	= array('author' => 'name', 'website' => 'url');
			$oldData	= (array)self::getVisitorData();
			$set		= array();

			foreach ($data as $k => $v) {
				if (in_array($k, $validData) || array_key_exists($k, $convert)) {
					if (isset($convert[$k])) {
						$set[$convert[$k]] = $v;
					}
					else {
						$set[$k] = $v;
					}
				}
			}

			setcookie('visitor_data', serialize(array_merge($oldData, $set)), time() + 31536000, WEBROOT);
		}
	}
?>
