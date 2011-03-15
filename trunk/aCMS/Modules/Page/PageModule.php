<?php
	class aCMS_PageModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['page_delete']) and SU) {
				self::deletePage($_POST['pages_id']);
			}
			elseif (isset($_POST['page_submit']) and ADMIN) {
				self::updatePage($_POST);
			}

			self::showThePage();
		}

		private static function showThePage () {
			# Don't allow "hidden" pages in the URL
			if (isset(Router::$params['url_str']) and substr(Router::$params['url_str'], 0, 2) == '__') {
				FourOFour::run();
			}

			# Try to get $get.url_str, else get home-page
			$page = Pages::getByURLStr(isset(Router::$params['url_str']) ? Router::$params['url_str'] : '__home');

			# If no url_str is set and we're admin on the AddPage-Page
			if (!isset(Router::$params['url_str']) and Router::getController() == 'AddPage' and ADMIN) {
				aFramework_BaseModule::$tplVars['html_title'] = Lang::get('Add a Page');
			}
			# No page exists
			elseif (!$page) {
				if (Router::getController() == 'Home') {
					return self::$tplFile = false;
				}
				else {
					FourOFour::run();
				}
			}
			# We found a page
			else {
				self::$tplVars['page'] = $page;

				# Don't change HTML-title on the home-page
				if (Router::getController() != 'Home') {
					aFramework_BaseModule::$tplVars['html_title']	= escHTML($page['title']);
				}

				aFramework_BaseModule::$tplVars['meta_description']	= escHTML($page['meta_description']);
				aFramework_BaseModule::$tplVars['meta_keywords']	= escHTML($page['meta_keywords']);

				# Change body-ID on PagePages (/about/ => #about-page, not #page-page)
				if (Router::getController() == 'Page') {
					aFramework_BaseModule::$tplVars['body_id'] = $page['url_str'];
				}
			}
		}

		private static function deletePage ($id) {
			Pages::delete($id);

			if (!XHR) {
				redirect(Router::urlFor('AddPage') . msg('Deleted Page', 'The page was successfully deleted.'));
			}
		}

		private static function updatePage ($row) {
			$new			= false;
			$row['url_str']	= empty($row['url_str']) ? $row['title'] : $row['url_str'];
			$row['url_str']	= Router::urlize($row['url_str']);

			# Make sure mandatory fields are filled out
			if (
					isset($row['title']) and !empty($row['title']) and 
					isset($row['content']) and !empty($row['content'])
				) {
				# If a page ID is set, update
				if (!empty($row['pages_id']) and is_numeric($row['pages_id'])) {
					Pages::update($row['pages_id'], $row);
				}
				# Not set, insert
				else {
					Pages::insert($row);
					$new = true;
				}
			}
			# Errors in form
			else {
				self::$tplVars['errors'] = true;
			}

			if (!XHR) {
				$prefix = (substr($row['url_str'], 0, 2) != '__') ? Router::urlFor('Page', $row) : '';

				if ($new) {
					redirect($prefix . msg('Inserted Page', 'The page was successfully inserted.'));
				}
				else {
					redirect($prefix . msg('Updated Page', 'The page was successfully updated.') . '&revision=');
				}
			}
		}
	}
?>
