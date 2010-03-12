<?php
	class aFramework_RevisionsModule {
		public static $tplVars = array();
		public static $tplFile = true;

		# A bit hard coded here... :/
		public static function run () {
			if (!ADMIN) {
				return self::$tplFile = false;
			}

			# aBlog Article
			if (isset(aBlog_ArticleModule::$tplVars['article']['articles_id'])) {
				$article = aBlog_ArticleModule::$tplVars['article'];

				self::$tplVars['revisions']	= Revisions::get('pub_date', 'DESC', 1, 5, 'table_name = "articles" AND table_id = ' . $article['articles_id']);
				self::$tplVars['type']		= 'Article';

				# If a revision is set - use that for content instead
			/*	if (isset($_GET['revision']) and !empty($_GET['revision'])) {
					$revision = Revisions::getByID($_GET['revision']);

					if ($revision) {
						aBlog_ArticleModule::$tplVars['article']['content'] = $revision['content'];
					}
				} */
			}
			# aCMS Page
			elseif (isset(aCMS_PageModule::$tplVars['page']['pages_id'])) {
				$page = aCMS_PageModule::$tplVars['page'];

				self::$tplVars['revisions'] = Revisions::get('pub_date', 'DESC', 1, 5, 'table_name = "pages" AND table_id = ' . $page['pages_id']);
				self::$tplVars['type']		= 'Page';

				# If a revision is set - use that for content instead
			/*	if (isset($_GET['revision']) and !empty($_GET['revision'])) {
					$revision = Revisions::getByID($_GET['revision']);

					if ($revision) {
						aCMS_PageModule::$tplVars['page']['content'] = $revision['content'];
					}
				} */
			}
			else {
				return self::$tplFile = false;
			}

			# Don't show any template if no revisions exists
			if (!isset(self::$tplVars['revisions']) or !self::$tplVars['revisions']) {
				return self::$tplFile = false;
			}
		}
	}
?>
