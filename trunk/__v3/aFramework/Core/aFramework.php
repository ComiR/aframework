<?php
	/**
	 * aFramework
	 *
	 * Runs either a single module or a controller of modules
	 **/
	final class aFramework {
		public static $debugInfo = array();

		/**
		 * run
		 *
		 * Runs either a single module or a controller of modules
		 **/
		public static function run () {
			if (isset($_GET['module'])) {
				if (XHR) {
					echo HTMLPacker::pack(self::runSingleModule(basename($_GET['module'])));
				}
				else {
					echo self::runSingleModule(basename($_GET['module']));
				}
			}
			elseif (isset($_GET['controller'])) {
				if ($_GET['controller'] == false) {
					FourOFour::run();
				}
				else {
					echo HTMLPacker::pack(self::runController(basename($_GET['controller'])));
				}
			}
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

			# Run and fetch all modules
			self::runModules($base);
			$theSite = self::fetchModules($base);
			$theSite = DEBUG ? str_replace('</body>', fetch(DOCROOT . 'aFramework/Files/debug.tpl.php') . '</body>', $theSite) : $theSite;

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
					$id			= (strtolower($module->nodeName) == 'wrapper') ? strtolower(ccFix($module->getAttribute('name'))) : strtolower(ccFix($module->nodeName));
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

							$page .= ">\n\n";
						}
						if (strtolower($module->nodeName) == 'wrapper') {
							$page .= $childModules;
						}
						else {
							$page .= $moduleTpl;
						}
						if ($module->nodeName != 'Base') {
							$page .= "\n\n</div>";
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
			foreach ($sites as $site) {
				$modPath = DOCROOT . $site . '/Modules/' . $module . '/' . $module . 'Module.php';
				$modName = $site . '_' . $module . 'Module';

				if (file_exists($modPath)) {
					$start		= microtime(true);
					$numQBefore	= dbQry(false, true);

					call_user_func($modName . '::run'); # $modName::run();

					$stop		= microtime(true);
					$numQAfter	= dbQry(false, true);

					self::$debugInfo['modules'][$module]['path']		= $modPath;
					self::$debugInfo['modules'][$module]['site']		= $site;
					self::$debugInfo['modules'][$module]['class_name']	= $modName;
					self::$debugInfo['modules'][$module]['run_time']	= $stop - $start;
					self::$debugInfo['modules'][$module]['tpl_file']	= eval('$tmpTplFile = ' . $modName . '::$tplFile;'); $tmpTplFile; # $modName::$tplFile;
					self::$debugInfo['modules'][$module]['tpl_vars']	= eval('$tmpTplVars = ' . $modName . '::$tplVars;'); $tmpTplVars; # $modName::$tplVars;
					self::$debugInfo['modules'][$module]['num_queries']	= $numQAfter['num_queries'] - $numQBefore['num_queries'];

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
		public static function fetchModule ($module, $tplVarsAdd = array()) {
			self::$debugInfo['modules'][$module]['name'] = $module;

			$sites		= explode(' ', SITE_HIERARCHY);
			$tplFile	= null;
			$tplVars	= $tplVarsAdd;
			$before		= '';
			$middle		= '';
			$after		= '';

			# Find the first module-class and store the template-filename
			# to be fetched as well as the template variables
			foreach ($sites as $site) {
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
				if ($before == '' and file_exists($beforePath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['before'] = $beforePath;

					$before = self::fetchTpl($beforePath, $tplVars);
				}

				# Middle
				if ($middle == '' and file_exists($middlePath)) {
					self::$debugInfo['modules'][$module]['tpl_paths']['middle'] = $middlePath;

					$middle = self::fetchTpl($middlePath, $tplVars);
				}

				# After
				if ($after == '' and file_exists($afterPath)) {
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
		#	if (!DEBUG) {
				ini_set('display_errors', false);
		#	}

			ob_start();
			$__all = $vars;
			extract((array)$vars);
			include $tpl;
			$contents = ob_get_contents();
			ob_end_clean();

		#	if (!DEBUG) {
				ini_set('display_errors', true);
		#	}

			return $contents;
		}
	}
?>