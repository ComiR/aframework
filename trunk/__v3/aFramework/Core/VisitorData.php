<?php
	/**
	 * VisitorData
	 *
	 * Stores and retrieves visitor data
	 **/
	final class VisitorData {
		private static $data = array();

		public static function run () {
			# Set self::data if a cookie is set
			if (isset($_COOKIE['visitor_data'])) {
				$data = unserialize(stripslashes($_COOKIE['visitor_data']));
				$data['remembered'] = true;

				self::$data = $data;
			}

			# A form wants to remember its user
			if (isset($_POST['remember_visitor_data']) and $_POST['remember_visitor_data']) {
				self::setVisitorData($_POST);
			}
		}

		public static function getVisitorData () {
			$data = self::$data;

			$data['author']		= isset($data['name']) ? $data['name'] : false;
			$data['website']	= isset($data['url']) ? $data['url'] : false;

			return $data;
		}

		private static function setVisitorData ($data) {
			$validData	= array('name', 'email', 'url', 'tel', 'author');
			$convert	= array('author' => 'name', 'website' => 'url');
			$oldData	= (array)self::getVisitorData();
			$newData	= array();

			foreach ($data as $k => $v) {
				if (in_array($k, $validData) || array_key_exists($k, $convert)) {
					if (isset($convert[$k])) {
						$newData[$convert[$k]] = $v;
					}
					else {
						$newData[$k] = $v;
					}
				}
			}

			self::$data = $latestData = array_merge($oldData, $newData);

			setcookie('visitor_data', serialize($latestData), time() + 31536000, WEBROOT);

			self::$data['remembered'] = true;
		}
	}
?>
