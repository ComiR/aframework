<?php
	class aFramework_AdminLoginModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# User is trying to log in
			if (isset($_POST['admin_login_submit'])) {
				if (isset($_POST['username']) and $_POST['username'] == Config::get('admin.user') and isset($_POST['password']) and $_POST['password'] == Config::get('admin.pass')) {
					if (isset($_POST['remember_login'])) {
						setcookie(ADMIN_SESSION, true, time()+60*60*24*365, WEBROOT);
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
			if (isset($_GET['logout'])) {
				unset($_SESSION[ADMIN_SESSION]);
				setcookie(ADMIN_SESSION, false, 0, WEBROOT);

				redirect('?logged_out');
			}
			# An error occurred
			if (isset($_GET['error'])) {
				self::$tplVars['error'] = true;
			}
		}
	}
?>