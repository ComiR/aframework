<?php
	/**
	 * aFramework
	 *
	 * Runs either a single module or a controller of modules
	 **/
	final class aFramework {
		public static $debugInfo = array();
		public static $autorunModules = array('Debug', 'ControllerAdmin', 'AutoStyleSwitcher');

		/**
		 * run
		 *
		 * Runs either a single module or a controller of modules
		 **/
		public static function run () {
			if ((!isset($_SERVER['PATH_INFO']) and isset($_GET['module'])) or (isset($_SERVER['PATH_INFO']) and $_SERVER['PATH_INFO'] == '/' . CURRENT_LANG . '/' and isset($_GET['module']))) {
				if (XHR) {
					echo HTMLPacker::pack(self::runSingleModule(basename($_GET['module'])));
				}
				else {
					echo self::runSingleModule(basename($_GET['module']));
				}
			}
			elseif (isset(Router::$params['controller'])) {
				if (Router::$params['controller'] == false) {
					FourOFour::run();
				}
				else {
					echo HTMLPacker::pack(self::runController(basename(Router::$params['controller'])));
					#header('content-type: text/plain');var_dump(self::$debugInfo);
				}
			}
		}

		private static function autoACForms ($html) {
			return preg_replace('/<form(.*?)>/', '<form$1 accept-charset="utf-8">', $html);
		}

		/**
		 * runSingleModule
		 *
		 * Runs and fetches a module
		 **/
		public static function runSingleModule ($module) {
			self::runModule($module);
			return self::fetchModule($module);
		}

		/**
		 * runController
		 *
		 * Runs and fetches all modules in a controller
		 **/
		public static function runController ($controller) {
			self::$debugInfo['controller']['name'] = $controller;

			$foundController = false;
			$sites = explode(' ', SITE_HIERARCHY);

			# Find the controller-XML-file
			foreach ($sites as $site) {
				$path = DOCROOT . $site . '/Controllers/' . $controller . '.xml';

				if (file_exists($path)) {
					$foundController = true;

					self::$debugInfo['controller']['path'] = $path;
					self::$debugInfo['controller']['site'] = $site;

					break;
				}
			}

			# Make sure a controller by that name exists
			if (!$foundController) {
				die('aFramework error: No controller named ' . $controller);
			}

			# Load the base-node
			$doc = new DOMDocument();
			$doc->load($path);
			$base = $doc->getElementsByTagName('Base');

			# Auto-insert some modules
			if (count(self::$autorunModules)) {
				foreach (self::$autorunModules as $mod) {
					$newMod = $doc->createElement($mod);

					foreach ($base as $rootMod) {
						$rootMod->appendChild($newMod);
						break;
					}
				}
			}

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
		public static function runModules ($modules) {
			$notElements = array('#text', '#comment', '#cdata-section');

			foreach ($modules as $module) {
				if (!in_array(strtolower($module->nodeName), $notElements)) {
					self::runModule($module->nodeName);

					if ($module->hasChildNodes()) {
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
		public static function fetchModules ($modules) {
			$notElements = array('#text', '#comment', '#cdata-section');
			$page = '';
			$i = 0;

			foreach ($modules as $module) {
				if (!in_array(strtolower($module->nodeName), $notElements)) {
					$childModules = false;

					if ($module->hasChildNodes()) {
						$childModules = self::fetchModules($module->childNodes);
					}

					$moduleTpl	= self::fetchModule($module->nodeName, array('child_modules' => $childModules));
					$isWrapper	= strtolower($module->nodeName) == 'wrapper' ? true : false;
					$id			= $isWrapper ? strtolower(ccFix($module->getAttribute('name'))) : strtolower(ccFix($module->nodeName));
					$title		= self::fetchModuleDescription($module->nodeName);

					self::$debugInfo['modules'][$module->nodeName]['html_id'] = $id;

					if ($moduleTpl or $childModules) {
						if (AUTO_HR and $i > 0) {
							$page .= "\n\n<hr />"; # :)
						}
						if ($module->nodeName != 'Base') {
							$page .= "\n\n<div id=\"$id\"";

							if ($title) {
								$page .= " title=\"$title\"";
							}

							if (CONTROLLER_ADMIN and !in_array($module->nodeName, self::$autorunModules)) {
								$page .= ' class="aframework-';

								if ($isWrapper) {
									$page .= 'wrapper';
								}
								else {
									$page .= 'module';
								}

								$page .= '"';
							}

							$page .= ">";

							if (CONTROLLER_ADMIN and !$isWrapper and !in_array($module->nodeName, self::$autorunModules)) {
								$page .= '<div class="aframework-module-header">' 
										. ucwords(str_replace('-', ' ', $id)) 
										. ' <a href="?remove_module=' . $module->nodeName . '">Remove</a></div>';
							}
						}
						if (strtolower($module->nodeName) == 'wrapper') {
							$page .= $childModules;
						}
						else {
							$page .= $moduleTpl;
						}
						if ($module->nodeName != 'Base') {
							$page .= "</div>";
						}

						$i++;
					}
				}
			}

			return $page;
		}

		/**
		 * fetchModuleDescription
		 *
		 * Gets the module's info.txt-file's contents
		 **/
		public static function fetchModuleDescription ($module) {
			$sites = explode(' ', SITE_HIERARCHY);

			foreach ($sites as $site) {
				$txtPath = DOCROOT . $site . '/Modules/' . $module . '/info.txt';

				if (file_exists($txtPath)) {
					return file_get_contents($txtPath);
				}
			}

			return false;
		}

		/**
		 * runModule
		 *
		 * Runs a module based on the SITE_HIERARCHY unless it's cached
		 **/
		public static function runModule ($module) {
			$sites = explode(' ', SITE_HIERARCHY);

			# Find the first Module-class and run it
			# No, run ALL module-classes
			foreach ($sites as $site) {
				$modPath = DOCROOT . $site . '/Modules/' . $module . '/' . $module . 'Module.php';
				$modName = $site . '_' . $module . 'Module';

				if (file_exists($modPath)) {
					$start		= microtime(true);
					$numQBefore	= DB::getNumQueries();

					call_user_func($modName . '::run'); # $modName::run();

					$stop		= microtime(true);
					$numQAfter	= DB::getNumQueries();

					self::$debugInfo['modules'][$module]['classes'][] = array(
						'path'			=> $modPath, 
						'site'			=> $site, 
						'class_name'	=> $modName, 
						'run_time'		=> $stop - $start, 
						'num_queries'	=> $numQAfter - $numQBefore
					#	'tpl_vars'		=> $modName::$tplVars
					);

				#	return true; # don't return here, keep running module-classes
				}
			}

		#	return false;
		}

		/**
		 * fetchModule
		 *
		 * Fetches a module based on the SITE_HIERARCHY or module's cache
		 * Also fetches Before or After-templates
		 **/
		public static function fetchModule ($module, $tplVarsAdd = array()) {
			self::$debugInfo['modules'][$module]['name'] = $module;

			$sites		= explode(' ', SITE_HIERARCHY);
			$tplFile	= null;
			$tplVars	= $tplVarsAdd;
			$before		= false;
			$middle		= false;
			$after		= false;

			# Find the -first- _last_ module-class and store the template-filename
			# to be fetched as well as the template variables
			$reversedSites = array_reverse($sites);

			foreach ($reversedSites as $site) {
				$modPath = DOCROOT . $site . '/Modules/' . $module . '/' . $module . 'Module.php';
				$modName = $site . '_' . $module . 'Module';

				if (file_exists($modPath)) {
				#	$tplFile = $modName::$tplFile === true ? $module : $modName::$tplFile;
				#	$tplVars = array_merge((array)$modName::$tplVars, $tplVars);

					eval('$tmpTplFile = ' . $modName . '::$tplFile;');
					eval('$tmpTplVars = ' . $modName . '::$tplVars;');

					$tplFile = $tmpTplFile === true ? $module : $tmpTplFile;
					$tplVars = array_merge((array)$tmpTplVars, $tplVars);

					break;
				}
			}

			# If tplFile is false that means the module doesn't want to display any template
			if ($tplFile === false) {
				return false;
			}
			# If it's still null (since declaration) no module-class existed and tpl-name is assumed to be module-name
			else if ($tplFile === null) {
				$tplFile = $module;
			}

			# Now that we have the template-file, go through all sites 
			# and get Before, Middle and After-templates
			foreach ($sites as $site) {
				$beforePath	= (ADMIN and file_exists(DOCROOT . $site . '/Modules/' . $module . '/Before' . $tplFile . 'Admin.tpl.php')) ? DOCROOT . $site . '/Modules/' . $module . '/Before' . $tplFile . 'Admin.tpl.php' : DOCROOT . $site . '/Modules/' . $module . '/Before' . $tplFile . '.tpl.php';
				$middlePath	= (ADMIN and file_exists(DOCROOT . $site . '/Modules/' . $module . '/' . $tplFile . 'Admin.tpl.php')) ? DOCROOT . $site . '/Modules/' . $module . '/' . $tplFile . 'Admin.tpl.php' : DOCROOT . $site . '/Modules/' . $module . '/' . $tplFile . '.tpl.php';
				$afterPath	= (ADMIN and file_exists(DOCROOT . $site . '/Modules/' . $module . '/After' . $tplFile . 'Admin.tpl.php')) ? DOCROOT . $site . '/Modules/' . $module . '/After' . $tplFile . 'Admin.tpl.php' : DOCROOT . $site . '/Modules/' . $module . '/After' . $tplFile . '.tpl.php';

				# Before
				if ($before === false and file_exists($beforePath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['before'] = $beforePath;

					$before = self::fetchTpl($beforePath, $tplVars);
				}

				# Middle
				if ($middle === false and file_exists($middlePath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['middle'] = $middlePath;

					$middle = self::fetchTpl($middlePath, $tplVars);
				}

				# After
				if ($after === false and file_exists($afterPath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['after'] = $afterPath;

					$after = self::fetchTpl($afterPath, $tplVars);
				}

				if ($before != '' and $middle != '' and $after != '') {
					break;
				}
			}

			$all = $before .$middle .$after;

			# If $child_modules is set and $all doesn't contain
			# it that means none of the module's template echo:ed
			# $child_modules, append them autoamtically
			if (isset($tplVarsAdd['child_modules']) and !empty($tplVarsAdd['child_modules']) and false === strpos($all, $tplVarsAdd['child_modules'])) {
				$all .= $tplVarsAdd['child_modules'];
			}

			return $all == '' ? false : $all;
		}

		/**
		 * fetchTpl
		 *
		 * Extracts tpl-vars into function-scope, turns off errors, includes and returns template
		 **/
		private static function fetchTpl ($tpl, $vars) {
			ini_set('display_errors', false);

			ob_start();

			$__all = $vars;

			extract((array)$vars);

			include $tpl;

			$contents = ob_get_contents();

			ob_end_clean();

			ini_set('display_errors', true);

			return $contents;
		}
	}
?>
