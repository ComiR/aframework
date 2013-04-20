<?php
	class AndreasLagerkvist_GplusPostsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!Config::get('google.plus_id')) {
				return self::$tplFile = false;
			}

			$limit	= 1;
			$url	= 'https://www.googleapis.com/plus/v1/people/' . Config::get('google.plus_id') . '/activities/public?alt=json&pp=1&key=' . Config::get('google_api.api_key') . '&maxResults=' . $limit . '&pageToken=';
			$res	= file_get_contents($url);
			$posts	= array();

			if ($res) {
				$res = json_decode($res);

				foreach ($res->items as $item) {
					$posts[] = $item;
				}
			}

			self::$tplVars['posts'] = $posts;
		}
	}
?>
