<?php
	class aBlog_ArticleCalendarModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars = array(
				'selected_month'	=> array(
					'digit'	=> 11, 
					'title'	=> 'November'
				), 
				'previous_month'	=> array(
					'digit'	=> 10, 
					'title'	=> 'October'
				), 
				'next_month'	=> array(
					'digit'	=> 12, 
					'title'	=> 'December'
				)
			);
		}
	}
?>
