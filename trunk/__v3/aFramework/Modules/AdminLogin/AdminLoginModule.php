<?php
	class aFramework_AdminLoginModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		public static function run() {
			# User is trying to log in
			if(isset($_REQUEST['login'])) {
				if(isset($_REQUEST['username']) and $_REQUEST['username'] == ADMIN_USER and isset($_REQUEST['password']) and $_REQUEST['password'] == ADMIN_PASS) {
					if(isset($_REQUEST['remember_login'])) {
						setcookie(ADMIN_SESSION, true, time()+60*60*24*365, WEBROOT .'/');
					}
					else {
						$_SESSION[ADMIN_SESSION] = true;
					}

					redirect('?logged_in');
				}
				else {
					redirect('?error');
				}
			}
			# User is trying to log out
			if(isset($_REQUEST['logout'])) {
				unset($_SESSION[ADMIN_SESSION]);
				setcookie(ADMIN_SESSION, false, 0, WEBROOT .'/');

				redirect('?logged_out');
			}
			# An error occurred
			if(isset($_GET['error'])) {
				self::$tplVars['error'] = true;
			}
		}
	}
?>