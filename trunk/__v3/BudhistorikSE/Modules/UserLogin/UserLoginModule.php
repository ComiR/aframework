<?php
	class BudhistorikSE_UserLoginModule {
		public static $tplVars = array();
		public static $tplFile = true;

		public static function run () {
			# User is trying to log in
			if (isset($_POST['user_login_submit'])) {
				if (isset($_POST['username']) and isset($_POST['password'])) {
					if (($user = Users::getByUsernamePassword($_POST['username'], md5(Config::get('admin.salt') . $_POST['password'])))) {
						$_SESSION[USER_SESSION] = array(
							'password' => md5(Config::get('admin.salt') . $user['password']), 
							'username' => $user['username']
						);

						redirect(msg('Logged In', 'You were successfully logged in as admin.'));
					}
					else {
						redirect(msg('Error Logging In', 'There was an error logging in. Please try again.', true));
					}
				}
			}
			# User is trying to log out
			if (isset($_GET['logout'])) {
				unset($_SESSION[USER_SESSION]);
				setcookie(USER_SESSION, false, 0, WEBROOT);

				redirectToReferrer(msg('Logged Out', 'You were successfully logged out.'));
			}
		}
	}
?>
