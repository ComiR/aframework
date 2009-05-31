<?php
	class aBlog_RandomLinksModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			if (isset($_POST['random_links_delete']) and ADMIN) {
				self::deleteLink($_POST['links_id']);
			}
			elseif (isset($_POST['random_links_submit']) and ADMIN) {
				self::insertLink($_POST);
			}

			if (!(self::$tplVars['links'] = Links::get('RAND()', 'ASC', 0, 4))) {
				self::$tplFile = false;
			}
		}

		private static function insertLink ($row) {
			# Make sure mandatory fields are filled out
			if (
				isset($row['title']) and !empty($row['title']) and 
				isset($row['description']) and !empty($row['description']) and 
				isset($row['url']) and !empty($row['url'])
			) {
				Links::insert($row);

				if (!XHR) {
					redirect('?added_link');
				}
			}
			# Errors in form
			else {
				self::$tplVars['errors'] = true;
			}
		}

		private static function deleteLink ($id) {
			Links::delete($id);

			if (!XHR) {
				redirect('?deleted_link');
			}
		}
	}
?>