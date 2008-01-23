<?php
	class IntroTextModule {
		public function run() {
			global $_TPLVARS;
			global $_PARAMS;

			# Hehe
			if($_PARAMS['page_type'] == 'Home') {
				$_TPLVARS['intro_text']['title'] = 'Welcome to the demo site';
				$_TPLVARS['intro_text']['content'] = '<p>This site is only a small demonstration of a site built on top of aFramework</p>';
			}

			# If no module has set an intro-text title, don't show any template
			if(!isset($_TPLVARS['intro_text']['title'])) {
				$_TPLVARS['IntroTextTplFile'] = false;
			}
		}
	}
?>