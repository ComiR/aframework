<?php
	class AdminLoginModule {
		public function run() {
			global $_TPLVARS;
			global $_PARAMS;

			# User is trying to log in
			if(isset($_REQUEST['login'])) {
				if(isset($_REQUEST['username']) and $_REQUEST['username'] == ADMIN_USER and isset($_REQUEST['password']) and $_REQUEST['password'] == ADMIN_PASS) {
					if(isset($_REQUEST['remember_login'])) {
						setcookie(ADMIN_SESSION, true, time()+60*60*24*365, "/");
					}
					else {
						$_SESSION[ADMIN_SESSION] = true;
					}

					redirect("?logged_in");
				}
				else {
					redirect("?error");
				}
			}
			# User is trying to log out
			if(isset($_REQUEST['logout'])) {
				unset($_SESSION[ADMIN_SESSION]);
				setcookie(ADMIN_SESSION, false, 0, "/");

				redirect("?logged_out");
			}

			if(isLoggedIn()) {
				$_TPLVARS['AdminLoginTplFile'] = 'LoggedIn';
			}
			elseif(isset($_GET['error'])) {
				$_TPLVARS['admin_login']['error'] = true;
			}
		}
	}
?>