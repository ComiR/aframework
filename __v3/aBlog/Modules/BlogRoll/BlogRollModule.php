<?php
	class aBlog_BlogRollModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run() {
			if(isset($_POST['blog_roll_submit']) and ADMIN) {
				self::insertLink($_POST);
			}

			self::getSomeRandomLinks();
		}

		private static function getSomeRandomLinks() {
			# Get some random links
			self::$tplVars['links'] = Links::getLinks('RAND()', 'ASC', 0, Config::get('ablog.num_recent_stuff') * 2);

			if(!self::$tplVars['links']) {
				self::$tplFile = 'NoLinks';
			}
		}

		private static function insertLink($row) {
			# Make sure mandatory fields are filled out
			if(
				isset($row['title']) and !empty($row['title']) and 
				isset($row['description']) and !empty($row['description']) and 
				isset($row['url']) and !empty($row['url'])
			) {
				Links::insert($row);

				if(!XHR) {
					redirect('?added_link');
				}
			}
			# Errors in form
			else {
				self::$tplVars['errors'] = true;
			}
		}
	}
?>
