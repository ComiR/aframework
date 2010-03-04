<?php
	class OurFutureEU_ActivitiesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$date = isset($_GET['date']) ? $_GET['date'] : false;

			if (!$date) {
				return self::$tplFile = false;
			}

			self::$tplVars['date']			= date(Config::get('general.date_format'), strtotime($date));
			self::$tplVars['activities']	= Activities::get('pub_date', 'ASC', 0, 1000000, "DATE_FORMAT(pub_date, '%Y-%m-%d') = '$date'");
		}
	}
?>
