<?php
	class aFrameworkCom_AframeworkGuideModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			self::$tplVars['guide_steps'] = self::getGuideSteps();
		}

		private static function getGuideSteps () {
			$path		= CURRENT_SITE_DIR . '/Files/guide/';
			$dh			= opendir($path);
			$guideSteps	= array();

			while ($f = readdir($dh)) {
				if (end(explode('.', $f)) == 'png') {
					$num = explode('-', $f);
					$num = $num[0];

					$guideSteps[] = array(
						'num'		=> $num, 
						'img_url'	=> WEBROOT . CURRENT_SITE . '/Files/guide/' . $f, 
						'points'	=> file($path . substr($f, 0, -4))
					);
				}
			}

			usort($guideSteps, array('self', 'sortGuideSteps'));

			return $guideSteps;
		}

		private static function sortGuideSteps ($a, $b) {
			if($a['num'] == $b['num']) {
				return 0;
			}

			return ($a['num'] < $b['num']) ? -1 : 1;
		}
	}
?>
