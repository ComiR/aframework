<?php
	class BaseModule {
		public function run() {
			global $_TPLVARS;
			global $_PARAMS;

			# Check for style-switching
			$tmp = array_merge($_GET, $_POST);
			$style = (isset($tmp['style'])) ? str_replace(array('..\\', '../', '/', '\\'), '', $tmp['style']) : false;

			if($style !== false and file_exists(STYLES_DIR .$style .'/style.css')) {
				setcookie('style', $style, time()+60*60*24*365, '/');
				redirect('?changed_style');
			}

			# Set tpl vars
			$_TPLVARS['base']['site_author'] = SITE_AUTHOR;
			$_TPLVARS['base']['site_title'] = SITE_TITLE;
			$_TPLVARS['base']['site_tagline'] = SITE_TAGLINE;
			$_TPLVARS['base']['page_type'] = $_PARAMS['page_type'];
			$_TPLVARS['base']['body_id'] = strtolower(ccFix($_PARAMS['page_type'], '-'));
			$_TPLVARS['base']['html_title'] = 'TMP';
			$_TPLVARS['style'] = (isset($_COOKIE['style'])) ? $_COOKIE['style'] : DEFAULT_STYLE;
		}
	}
?>