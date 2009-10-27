<?php
	class aBlog_PostItModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['post_its'] = array(
				array(
					'post_its_id'	=> 1,
					'content'		=> 'Lorem ipsum dolor'
				), 
				array(
					'post_its_id'	=> 2,
					'content'		=> 'Dolor sit amet'
				), 
				array(
					'post_its_id'	=> 3,
					'content'		=> 'Consequeteur lipsumus dolirus'
				)
			);

			self::$tplVars['first_date'] = '24th Oct';
			self::$tplVars['last_date'] = '12th Nov';
		}
	}
?>
