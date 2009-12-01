<?php
	class aFramework_LangSwitcherModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			$langs = explode(',', Config::get('general.allowed_langs'));

			if (1 == count($langs)) {
				return self::$tplFile = false;
			}

			foreach ($langs as $lang) {
				self::$tplVars['langs'][] = array(
					'title'		=> Lang::lcToName($lang),
					'lc'		=> $lang, 
					'cc'		=> Lang::lc2cc($lang), 
					'selected'	=> CURRENT_LANG == $lang ? true : false
				);
			}
		}
	}
?>
