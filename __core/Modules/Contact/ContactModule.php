<?php
	require_once LIB_DIR .'FormValidator.php';

	/**
	 * The Contact Module allows the user to
	 * send an email to the site author (email-
	 * address as specified in Config.php)
	 *
	 * @class ContactModule
	 */
	class ContactModule {
		/**
		 * This is what's run by aFramework if this module is included
		 *
		 * @method run
		 */
		public function run() {
			global $_TPLVARS;

			# Send message, ajax or not
			if(isset($_REQUEST['send_message'])) {
				$this->sendEmail();
			}

			# This only happens on non-js
			if(isset($_GET['msg_sent'])) {
				$_TPLVARS['ContactTplFile'] = 'MsgSent';
			}
			if(isset($_GET['error'])) {
				$_TPLVARS['contact']['error'] = true;
			}
		}

		/**
		 * Validates form and sends email
		 *
		 * @method sendEmail
		 */
		private function sendEmail() {
			global $_TPLVARS;
			$fv = new FormValidator();

			# Make sure all mandatory fields are set
			if(isset($_REQUEST['message']) and isset($_REQUEST['name']) and isset($_REQUEST['email']) and $fv->validate($_REQUEST)) {
				# Make sure it's not spam
				if(!isSpam(array(
					'comment_content' => $_REQUEST['message'], 
					'comment_author' => $_REQUEST['name'], 
					'comment_author_email' => $_REQUEST['email']
				))) {
					mail(CONTACT_EMAIL, 'From Website', $_REQUEST['message'], 'From: ' .$_REQUEST['name'] .' <' .$_REQUEST['email'] .">\r\n");
				}

				# Don't redirect if it's an ajax-call
				if(!AJAX_CALL) {
					redirectToReferer('msg_sent'); # redirects to referrer because form-action goes to /mod/Module/ for performance
				}

				$_TPLVARS['ContactTplFile'] = 'MsgSent';
			}
			else {
				# Don't redirect if it's an ajax-call
				if(!AJAX_CALL) {
					redirectToReferer('error'); # redirects to referrer because form-action goes to /mod/Module/ for performance
				}

				$_TPLVARS['contact']['error'] = true;
			}
		}
	}
?>