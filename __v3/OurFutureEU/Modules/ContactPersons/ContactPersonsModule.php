<?php
	class OurFutureEU_ContactPersonsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (!isset(aCMS_PageModule::$tplVars['page']['pages_id'])) {
				return self::$tplFile = false;
			}

			$pagesID = aCMS_PageModule::$tplVars['page']['pages_id'];

			self::$tplVars['persons'] = ContactPersons::getByPagesID($pagesID);

			if (Router::$params['controller'] == 'ContactPage') {
				self::$tplVars['title'] = Lang::get('Contact Persons Grouped by Country');
			}
			else {
				self::$tplVars['title'] = Lang::get('Participating Partners and their Contact Persons');
			}
		}
	}
?>
