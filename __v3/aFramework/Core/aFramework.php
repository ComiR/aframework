<?php
	/**
	 * aFramework
	 *
	 * Runs either a single module or a controller of modules
	 **/
	final class aFramework {
		private static $forceController = false;
		private static $debugInfo = array();

		/**
		 * run
		 *
		 * Runs either a single module or a controller of modules
		 **/
		public static function run() {
			if(isset($_GET['module'])) {
				if(XHR) sleep(1);
				echo self::runSingleModule(removeDots($_GET['module']));
			}
			elseif(isset($_GET['controller'])) {
				echo self::runController(removeDots($_GET['controller']));
			}
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
			aFramework_DebugModule::$tplVars['controller']['name'] = $controller;

			$foundController = false;
			$sites = explode(' ', SITE_HIERARCHY);

			# Find the controller-XML-file
			foreach($sites as $site) {
				$path = ROOT_DIR .$site .'/Controllers/' .$controller .'.xml';
				if(file_exists($path)) {
					$foundController = true;

					aFramework_DebugModule::$tplVars['controller']['path'] = ROOT_DIR .$site .'/Controllers/' .$controller .'.xml';
					aFramework_DebugModule::$tplVars['controller']['site'] = $site;

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

			# Now we need to check if any module wanted to force
			# a different controller (like 404 or login or whatever)
			if(self::$forceController) {
				$_GET['controller']					= self::$forceController; # a lil uglöy hack...
				self::$forceController				= false;
				aFramework_DebugModule::$tplVars	= array('__old' => aFramework_DebugModule::$tplVars);

				return self::runController($_GET['controller']);
			}

			if($_GET['controller'] == FOUR_O_FOUR_CONTROLLER) {
				header('HTTP/1.1 404 Not Found');
			}

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

					aFramework_DebugModule::$tplVars['modules'][$module->nodeName]['html_id'] = $id;

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
				$modPath = ROOT_DIR .$site .'/Modules/' .$module .'/' .$module .'Module.php';
				$modName = $site .'_' .$module .'Module';

				if(file_exists($modPath)) {
					$start		= microtime(true);
					$numQBefore	= dbQry(false, true);

					$modName::run();
					#call_user_func("$modName::run()");

					$stop		= microtime(true);
					$numQAfter	= dbQry(false, true);

					if($modName::$forceController) {
						self::$forceController = $modName::$forceController;

						aFramework_DebugModule::$tplVars['controller']['forced_by'] = $modName;
					}

					aFramework_DebugModule::$tplVars['modules'][$module]['path']				= $modPath;
					aFramework_DebugModule::$tplVars['modules'][$module]['site']				= $site;
					aFramework_DebugModule::$tplVars['modules'][$module]['class_name']			= $modName;
					aFramework_DebugModule::$tplVars['modules'][$module]['run_time']			= $stop - $start;
					aFramework_DebugModule::$tplVars['modules'][$module]['force_controller']	= $modName::$forceController;
					aFramework_DebugModule::$tplVars['modules'][$module]['tpl_file']			= $modName::$tplFile;
					aFramework_DebugModule::$tplVars['modules'][$module]['tpl_vars']			= $modName::$tplVars;
					aFramework_DebugModule::$tplVars['modules'][$module]['num_queries']			= $numQAfter['num_queries'] - $numQBefore['num_queries'];

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
			aFramework_DebugModule::$tplVars['modules'][$module]['name'] = $module;

			$sites		= explode(' ', SITE_HIERARCHY);
			$tplFile	= null;
			$tplVars	= $tplVarsAdd;
			$before		= '';
			$middle		= '';
			$after		= '';

			# Find the first module-class and store the template-filename
			# to be fetched as well as the template variables
			foreach($sites as $site) {
				$modPath = ROOT_DIR .$site .'/Modules/' .$module .'/' .$module .'Module.php';
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
				$beforePath	= (ADMIN and file_exists(ROOT_DIR .$site .'/Modules/' .$module .'/Before' .$tplFile .'Admin.tpl.php')) ? ROOT_DIR .$site .'/Modules/' .$module .'/Before' .$tplFile .'Admin.tpl.php' : ROOT_DIR .$site .'/Modules/' .$module .'/Before' .$tplFile .'.tpl.php';
				$middlePath	= (ADMIN and file_exists(ROOT_DIR .$site .'/Modules/' .$module .'/' .$tplFile .'Admin.tpl.php')) ? ROOT_DIR .$site .'/Modules/' .$module .'/' .$tplFile .'Admin.tpl.php' : ROOT_DIR .$site .'/Modules/' .$module .'/' .$tplFile .'.tpl.php';
				$afterPath	= (ADMIN and file_exists(ROOT_DIR .$site .'/Modules/' .$module .'/After' .$tplFile .'Admin.tpl.php')) ? ROOT_DIR .$site .'/Modules/' .$module .'/After' .$tplFile .'Admin.tpl.php' : ROOT_DIR .$site .'/Modules/' .$module .'/After' .$tplFile .'.tpl.php';

				# Before
				if($before == '' and file_exists($beforePath)) {
					aFramework_DebugModule::$tplVars['modules'][$module]['tpl_paths']['before'] = $beforePath;

					$before = self::fetchTpl($beforePath, $tplVars);
				}

				# Middle
				if($middle == '' and file_exists($middlePath)) {
					aFramework_DebugModule::$tplVars['modules'][$module]['tpl_paths']['middle'] = $middlePath;

					$middle = self::fetchTpl($middlePath, $tplVars);
				}

				# After
				if($after == '' and file_exists($afterPath)) {
					aFramework_DebugModule::$tplVars['modules'][$module]['tpl_paths']['after'] = $afterPath;

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