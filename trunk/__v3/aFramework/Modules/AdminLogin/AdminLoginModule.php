<?php
	class aFramework_AdminLoginModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# User is trying to log in
			if (isset($_POST['admin_login_submit'])) {
				if (isset($_POST['username']) and isset($_POST['password'])) {
					if ($_POST['username'] == Config::get('admin.user') and $_POST['password'] == Config::get('admin.pass')) {
						if (isset($_POST['remember_login'])) {
							setcookie(ADMIN_SESSION, true, time()+60*60*24*365, WEBROOT);
						}
						else {
							$_SESSION[ADMIN_SESSION] = true;
						}

						redirect(msg('Logged In', 'You were successfully logged in as admin.'));
					}
					elseif ($_POST['username'] == Config::get('su.user') and $_POST['password'] == Config::get('su.pass')) {
						if (isset($_POST['remember_login'])) {
							setcookie(SU_SESSION, true, time()+60*60*24*365, WEBROOT);
						}
						else {
							$_SESSION[SU_SESSION] = true;
						}

						redirect(msg('Logged In', 'You were successfully logged in as SU.'));
					}
					else {
						redirect(msg('Error Logging In', 'There was an error logging in. Please try again.', true));
					}
				}
			}
			# User is trying to log out
			if (isset($_GET['logout'])) {
				unset($_SESSION[ADMIN_SESSION]);
				setcookie(ADMIN_SESSION, false, 0, WEBROOT);
				unset($_SESSION[SU_SESSION]);
				setcookie(SU_SESSION, false, 0, WEBROOT);

				redirectToReferrer(msg('Logged Out', 'You were successfully logged out.'));
			}
		}
	}
?>
