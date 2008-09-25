<?php
	/**
	 * aFramework
	 *
	 * Runs either a single module or a controller of modules
	 **/
	final class aFramework {
		public static $force404		= false;
		public static $debugInfo	= array();

		/**
		 * run
		 *
		 * Runs either a single module or a controller of modules
		 **/
		public static function run() {
			if(isset($_GET['module'])) {
				echo self::runSingleModule(removeDots($_GET['module']));
			}
			elseif(isset($_GET['controller'])) {
				if($_GET['controller'] == false) {
					self::run404();
				}
				else {
					echo self::runController(removeDots($_GET['controller']));
				}
			}
		}

		/**
		 * run404
		 *
		 * In case a 404 occurrs
		 **/
		private static function run404() {
			header('HTTP/1.1 404 Not Found');

			$referrer		= isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : false;
			$referrerSite	= false;
			$internalRef	= stristr($referrer, $_SERVER['SERVER_NAME']);
			$searchRef		= (
				stristr($referrer, 'looksmart.co') or 
				stristr($referrer, 'ifind.freeserve.co') or 
				stristr($referrer, 'ask.co') or 
				stristr($referrer, 'google.') or 
				stristr($referrer, 'altavista.co') or 
				stristr($referrer, 'msn.co') or
				stristr($referrer, 'yahoo.co')
			);

			if($referrer) {
				$referrerSite = explode('/', $referrer);
				$referrerSite = $referrerSite[2];
			}

			# For the search-results-module
			$_GET['q']		= trim(str_replace(array('index.php', '/', '-'), ' ', $_SERVER['REQUEST_URI']));

			include DOCROOT .'aFramework/Files/404-stuff/head.php';

			if(!$referrer) {
				include DOCROOT .'aFramework/Files/404-stuff/no-referrer.php';
			}
			elseif($internalRef) {
				include DOCROOT .'aFramework/Files/404-stuff/internal-referrer.php';
			}
			elseif($searchRef) {
				$qryStrings = array(
					'q', 
					'p', 
					'ask', 
					'key'
				);
				$params = explode('?', $referrer);
				$params = explode('&', $params[1]);

				foreach($params as $p) {
					$ps = explode('=', $p);

					if(in_array($ps[0], $qryStrings)) {
						$_GET['q'] = str_replace('+', ' ', $ps[1]);
					}
				}

				include DOCROOT .'aFramework/Files/404-stuff/search-referrer.php';
			}
			else {
				include DOCROOT .'aFramework/Files/404-stuff/other-referrer.php';
			}

			self::runModule('SearchResults');
			echo str_replace('</h2>', ' on ' .SITE_TITLE .'</h2>', self::fetchModule('SearchResults'));

			include DOCROOT .'aFramework/Files/404-stuff/foot.php';

			die;
		}

		/**
		 * runSingleModule
		 *
		 * Runs and fetches a module
		 **/
		private static function runSingleModule($module) {
			self::runModule($module);
			return self::fetchModule($module);
		}

		/**
		 * runController
		 *
		 * Runs and fetches all modules in a controller
		 **/
		private static function runController($controller) {
			self::$debugInfo['controller']['name'] = $controller;

			$foundController = false;
			$sites = explode(' ', SITE_HIERARCHY);

			# Find the controller-XML-file
			foreach($sites as $site) {
				$path = DOCROOT .$site .'/Controllers/' .$controller .'.xml';
				if(file_exists($path)) {
					$foundController = true;

					self::$debugInfo['controller']['path'] = DOCROOT .$site .'/Controllers/' .$controller .'.xml';
					self::$debugInfo['controller']['site'] = $site;

					break;
				}
			}

			# Make sure a controller by that name exists
			if(!$foundController) {
				die('No controller named ' .$controller);
			}

			# Load the base-node
			$doc = new DOMDocument();
			$doc->load($path);
			$base = $doc->getElementsByTagName('Base');

			# Run and fetch all modules
			self::runModules($base);
			$theSite = self::fetchModules($base);

			return $theSite;
		}

		/**
		 * runModules
		 *
		 * Runs all modules in a contrller starting with the oldest parent
		 **/
		private static function runModules($modules) {
			$notElements = array('#text', '#comment', '#cdata-section');

			foreach($modules as $module) {
				if(!in_array(strtolower($module->nodeName), $notElements)) {
					self::runModule($module->nodeName);

					# Now we need to check if any module wanted to force a 404-page
					if(self::$force404) {
						self::run404();
					}

					if($module->hasChildNodes()) {
						self::runModules($module->childNodes);
					}
				}
			}
		}

		/**
		 * fetchModules
		 *
		 * Fetches all module-tpls in a contrlller starting with the youngest child
		 **/
		private static function fetchModules($modules) {
			$notElements = array('#text', '#comment', '#cdata-section');
			$page = '';
			$i = 0;

			foreach($modules as $module) {
				if(!in_array(strtolower($module->nodeName), $notElements)) {
					$childModules = false;

					if($module->hasChildNodes()) {
						$childModules = self::fetchModules($module->childNodes);
					}

					$moduleTpl = self::fetchModule($module->nodeName, array('child_modules' => $childModules));
					$id = (strtolower($module->nodeName) == 'wrapper') ? strtolower(ccFix($module->getAttribute('name'))) : strtolower(ccFix($module->nodeName));

					self::$debugInfo['modules'][$module->nodeName]['html_id'] = $id;

					if($moduleTpl or $childModules) {
						if(AUTO_HR and $i > 0) {
							$page .= "\n\n<hr />"; # :)
						}
						if($module->nodeName != 'Base') {
							$page .= "\n\n<div id=\"$id\">\n\n";
						}
						if(strtolower($module->nodeName) == 'wrapper') {
							$page .= $childModules;
						}
						else {
							$page .= $moduleTpl;
						}
						if($module->nodeName != 'Base') {
							$page .= "\n\n</div>";
						}

						$i++;
					}
				}
			}

			return $page;
		}

		/**
		 * runModule
		 *
		 * Runs a module based on the SITE_HIERARCHY unless it's cached
		 **/
		private static function runModule($module) {
			$sites = explode(' ', SITE_HIERARCHY);

			# Find the first Module-class and run it
			foreach($sites as $site) {
				$modPath = DOCROOT .$site .'/Modules/' .$module .'/' .$module .'Module.php';
				$modName = $site .'_' .$module .'Module';

				if(file_exists($modPath)) {
					$start		= microtime(true);
					$numQBefore	= dbQry(false, true);

					$modName::run();
					#call_user_func("$modName::run()");

					$stop		= microtime(true);
					$numQAfter	= dbQry(false, true);

					self::$debugInfo['modules'][$module]['path']				= $modPath;
					self::$debugInfo['modules'][$module]['site']				= $site;
					self::$debugInfo['modules'][$module]['class_name']			= $modName;
					self::$debugInfo['modules'][$module]['run_time']			= $stop - $start;
					self::$debugInfo['modules'][$module]['tpl_file']			= $modName::$tplFile;
					self::$debugInfo['modules'][$module]['tpl_vars']			= $modName::$tplVars;
					self::$debugInfo['modules'][$module]['num_queries']			= $numQAfter['num_queries'] - $numQBefore['num_queries'];

					return true;
				}
			}

			return false;
		}

		/**
		 * fetchModule
		 *
		 * Fetches a module based on the SITE_HIERARCHY or module's cache
		 * Also fetches Before or After-templates
		 **/
		private static function fetchModule($module, $tplVarsAdd = array()) {
			self::$debugInfo['modules'][$module]['name'] = $module;

			$sites		= explode(' ', SITE_HIERARCHY);
			$tplFile	= null;
			$tplVars	= $tplVarsAdd;
			$before		= '';
			$middle		= '';
			$after		= '';

			# Find the first module-class and store the template-filename
			# to be fetched as well as the template variables
			foreach($sites as $site) {
				$modPath = DOCROOT .$site .'/Modules/' .$module .'/' .$module .'Module.php';
				$modName = $site .'_' .$module .'Module';

				if(file_exists($modPath)) {
					$tplFile = $modName::$tplFile === true ? $module : $modName::$tplFile;
					$tplVars = array_merge($modName::$tplVars, $tplVars);

					break;
				}
			}

			# If tplFile is false that means the module doesn't want to display any template
			if($tplFile === false) {
				return false;
			}
			# If it's still null (since declaration) no module-class existed and tpl-name is assumed to be module-name
			else if($tplFile === null) {
				$tplFile = $module;
			}

			# Now that we have the template-file, go through all sites 
			# and get Before, Middle and After-templates
			foreach($sites as $site) {
				$beforePath	= (ADMIN and file_exists(DOCROOT .$site .'/Modules/' .$module .'/Before' .$tplFile .'Admin.tpl.php')) ? DOCROOT .$site .'/Modules/' .$module .'/Before' .$tplFile .'Admin.tpl.php' : DOCROOT .$site .'/Modules/' .$module .'/Before' .$tplFile .'.tpl.php';
				$middlePath	= (ADMIN and file_exists(DOCROOT .$site .'/Modules/' .$module .'/' .$tplFile .'Admin.tpl.php')) ? DOCROOT .$site .'/Modules/' .$module .'/' .$tplFile .'Admin.tpl.php' : DOCROOT .$site .'/Modules/' .$module .'/' .$tplFile .'.tpl.php';
				$afterPath	= (ADMIN and file_exists(DOCROOT .$site .'/Modules/' .$module .'/After' .$tplFile .'Admin.tpl.php')) ? DOCROOT .$site .'/Modules/' .$module .'/After' .$tplFile .'Admin.tpl.php' : DOCROOT .$site .'/Modules/' .$module .'/After' .$tplFile .'.tpl.php';

				# Before
				if($before == '' and file_exists($beforePath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['before'] = $beforePath;

					$before = self::fetchTpl($beforePath, $tplVars);
				}

				# Middle
				if($middle == '' and file_exists($middlePath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['middle'] = $middlePath;

					$middle = self::fetchTpl($middlePath, $tplVars);
				}

				# After
				if($after == '' and file_exists($afterPath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['after'] = $afterPath;

					$after = self::fetchTpl($afterPath, $tplVars);
				}

				if($before != '' and $middle != '' and $after != '') {
					break;
				}
			}

			$all = $before .$middle .$after;

			return $all == '' ? false : $all;
		}

		/**
		 * fetchTpl
		 *
		 * Extracts tpl-vars into function-scope, turns off errors, includes and returns template
		 **/
		private static function fetchTpl($tpl, $vars) {
		#	if(!DEBUG) {
				ini_set('display_errors', false);
		#	}

			ob_start();
			$__all = $vars;
			extract((array)$vars);
			include $tpl;
			$contents = ob_get_contents();
			ob_end_clean();

		#	if(!DEBUG) {
				ini_set('display_errors', true);
		#	}

			return $contents;
		}
	}
?>