<?php
	class aBlog_ArticlesByDateModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$articles	= Articles::get('pub_date', 'DESC');
			$dates		= array();
			$currDate	= false;

			foreach ($articles as $a) {
				$monthYear = date('F Y', strtotime($a['pub_date']));

				if ($currDate === false or $currDate != $monthYear) {
					$currDate = $monthYear;

					$dates[$monthYear] = array(
						'month_year'	=> $monthYear, 
						'year'			=> date('Y', strtotime($a['pub_date'])), 
						'month'			=> date('m', strtotime($a['pub_date']))
					);
				}

				$dates[$monthYear]['articles'][] = $a;
			}

			self::$tplVars['dates'] = $dates;
		}
	}
?>