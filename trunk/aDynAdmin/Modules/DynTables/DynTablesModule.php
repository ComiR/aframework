<?php
	class aDynAdmin_DynTablesModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!SU) {
				FourOFour::run();
			}

			# Change style
			aFramework_BaseModule::$tplVars['style'] = '__dynadmin';

			# Get all tables
			self::$tplVars['tables'] = DynItem::getTables(explode(',', Config::get('lang.translated_tables')), CURRENT_LANG, explode(',', Config::get('lang.allowed_langs')));
		}
	}
?>
