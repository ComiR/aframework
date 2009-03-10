<?php
	/**
	 * StyleSwitcher
	 *
	 * Switches styles if allowed
	 **/
	final class StyleSwitcher {
		/**
		 * run
		 *
		 * Runs the switcher
		 **/
		public static function run (  ) {
			# Make sure user-selected style exists
			if ( isset($_COOKIE['style']) and !is_dir(CURRENT_SITE_DIR . 'Styles/' . $_COOKIE['style'] . '/') ) {
				self::setStyle(Config::get('general.default_style'));
			}

			# Don't do nothing if current site doesn't allow styles
			if ( !Config::get('general.allow_styles') ) {
				return false;
			}

			# See if user wants to change style
			$tmp = array_merge($_GET, $_POST);

			if ( isset($tmp['style']) ) {
				self::setStyle($tmp['style']);
			}
		}

		/**
		 * setStyle
		 *
		 * "Cleans" style-path, sets style-cookie and redirects
		 **/
		private static function setStyle ( $style ) {
			$style = removeDots($style);

			if ( is_dir(CURRENT_SITE_DIR . 'Styles/' . $style . '/') ) {
				setcookie('style', $style, time() + 31536000, WEBROOT);

				if ( !XHR ) {
					redirect('?changed_style');
				}
			}
		}
	}
?>