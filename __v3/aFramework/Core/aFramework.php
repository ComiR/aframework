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
			# Only allow module calls from root (or language-root (/sv/?module is OK))
			# We don't want every URL to be able to look like any module for SEO reasons
			if (
				(
					!isset($_SERVER['PATH_INFO']) and 
					isset($_GET['module'])
				) or 
				(
					isset($_SERVER['PATH_INFO']) and 
					$_SERVER['PATH_INFO'] == '/' . CURRENT_LANG . '/' and 
					isset($_GET['module'])
				)
			) {
				# Only pack modules on ajax requests
				# Why? I don't remember... most (all? so far i think...) module-calls that aren't ajax-calls
				# are code-compressor, jspacker, captcha etc... (they should be moved to Utils...)
				if (XHR) {
					echo HTMLPacker::pack(self::runSingleModule(basename($_GET['module'])));
				}
				else {
					echo self::runSingleModule(basename($_GET['module']));
				}
			}
			# ?module isn't set or set outside root, check if a controller could be determined.
			# Even if a controller was found through the routes it may still call
			# FourOFour on its own (the Page-module on the Page-controller might not find a page for example)
			elseif (Router::getController()) {
				$theWholePage = HTMLPacker::pack(self::runController(Router::getController()));

				echo $theWholePage;

				CacheManager::createCache($theWholePage);

				# For debugging (first remove 'echo' above)
			#	header('content-type: text/plain');var_dump(self::$debugInfo);die;
			}
			# No route matched the requested URI
			else {				
				FourOFour::run();
			}
		}

		/**
		 * autoACForms
		 *
		 * Automatically inserts the accept-charset attribute (with utf-8) in all forms
		 **/
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

			$foundController	= false;
			$sites				= explode(' ', SITE_HIERARCHY);

			# Find the controller-XML-file, start from the top-prio site
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
				die('aFramework Error: No controller named <strong>' . $controller . '</strong> please create it as <strong>' . CURRENT_SITE_DIR . 'Controllers/' . $controller . '.xml</strong> or change your route pointing to this controller');
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
		 * Runs all modules in a controller starting with the oldest parent
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
		 * Fetches all module-tpls in a controlller starting with the youngest child
		 **/
		public static function fetchModules ($modules) {
			$notElements	= array('#text', '#comment', '#cdata-section');
			$page			= '';
			$i				= 0;

			foreach ($modules as $module) {
				if (!in_array(strtolower($module->nodeName), $notElements)) {
					# Modules may contain modules
					$childModules = false;

					# If this one does, fetch children first
					if ($module->hasChildNodes()) {
						$childModules = self::fetchModules($module->childNodes);
					}

					# We need to differentiate wrappers and modules
					$isWrapper = strtolower($module->nodeName) == 'wrapper' ? true : false;

					# Wrappers don't have templates, a wrapper only contains child-modules
					$moduleTpl = $isWrapper ? false : self::fetchModule($module->nodeName, array('child_modules' => $childModules));

					# Only continue if we have a module template or child modules
					if ($moduleTpl or $childModules) {
						# Wrappers get their HTML-IDs from their name-attributes
						# whereas modules get them from the actual node name
						$id = $isWrapper ? strtolower(ccFix($module->getAttribute('name'))) : strtolower(ccFix($module->nodeName));

						# Module creators may include a info.txt-file in their module-dirs
						$title = false;
					#	$title = self::fetchModuleDescription($module->nodeName);

						# We store this here, most of the module debug-info
						# is stored in self::fetchModule()
						self::$debugInfo['modules'][$module->nodeName]['html_id']	= $id;
						self::$debugInfo['modules'][$module->nodeName]['name']		= $module->nodeName;

						# Auto-insert hr-elements between modules
						# (but not for the first module in a parent/wrapper)
						if (AUTO_HR and $i > 0) {
							$page .= "\n\n<hr />"; # :)
						}

						# Wrapp all modules (cept Base) and wrappers in divs
						# Create the opening div-tag:
						if ($module->nodeName != 'Base') {
							$page .= "\n\n<div id=\"$id\"";

							# info.txt-files in module-dirs will be put in the div's title-attribute
							if ($title) {
								$page .= " title=\"$title\"";
							}

							# If an admin is running the controller-admin also add a class to all modules (aframework-module)
							# and one to all wrappers (aframework-wrapper). Don't add any class to autorunModules such as AutoLangSwitcher.
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

							# Close the opening div-tag
							$page .= ">";

							# Add a module-header to all modules if we're on controller-admin
							if (CONTROLLER_ADMIN and !$isWrapper and !in_array($module->nodeName, self::$autorunModules)) {
								$page .= '<div class="aframework-module-header">' 
										. ucwords(str_replace('-', ' ', $id)) 
										. ' <a href="?remove_module=' . $module->nodeName . '">Remove</a></div>';
							}
						}

						# If it's a wrapper just append the child-modules
						if (strtolower($module->nodeName) == 'wrapper') {
							$page .= $childModules;
						}
						# If it's a real module append (potential) module template
						else {
							$page .= $moduleTpl;
						}

						# Close the div
						if ($module->nodeName != 'Base') {
							$page .= "</div>";
						}

						# Keep track of which module we're on
						# (just so we know when we're on the first in a parent)
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
		 * Runs a module based on the SITE_HIERARCHY
		 **/
		public static function runModule ($module) {
			$sites = explode(' ', SITE_HIERARCHY);

			# Run ALL module-classes
			foreach ($sites as $site) {
				# Keep the path to the module-file as well as its name
				$modPath = DOCROOT . $site . '/Modules/' . $module . '/' . $module . 'Module.php';
				$modName = $site . '_' . $module . 'Module';

				# Only continue if the file actually exists
				if (file_exists($modPath)) {
					# We keep track of how slow or fast modules are and how many queries they use
					$start		= microtime(true);
					$numQBefore	= DB::getNumQueries();

					# Now run the module through its mandatory run() method
					call_user_func($modName . '::run'); # $modName::run();

					# Stop the time
					$stop		= microtime(true);
					$numQAfter	= DB::getNumQueries();

					# Remeber som debug info
					self::$debugInfo['modules'][$module]['classes'][] = array(
						'path'			=> $modPath, 
						'site'			=> $site, 
						'class_name'	=> $modName, 
						'run_time'		=> $stop - $start, 
						'num_queries'	=> $numQAfter - $numQBefore
					#	'tpl_vars'		=> $modName::$tplVars	# php >= 5.3
					);
				}
			}
		}

		/**
		 * fetchModule
		 *
		 * Fetches a module based on the SITE_HIERARCHY
		 * Also fetches Before or After-templates.
		 * $tplVarsAdd holds added template-variables. Only used for child-modules so far.
		 * Because we only know what the child-modules are in fetchModuleS we pass them from there.
		 **/
		public static function fetchModule ($module, $tplVarsAdd = array()) {
			$sites		= explode(' ', SITE_HIERARCHY);
			$tplFile	= null;
			$tplVars	= $tplVarsAdd;
			$before		= false;
			$middle		= false;
			$after		= false;

			# Find the last module-class and store the template-filename
			# to be fetched as well as the template variables
			$reversedSites = array_reverse($sites);

			foreach ($reversedSites as $site) {
				# Keep path and name
				$modPath = DOCROOT . $site . '/Modules/' . $module . '/' . $module . 'Module.php';
				$modName = $site . '_' . $module . 'Module';

				# If this site has a moduel class
				if (file_exists($modPath)) {
					# Grab its template file and template variables
				#	$tplFile = $modName::$tplFile === true ? $module : $modName::$tplFile;
				#	$tplVars = array_merge((array)$modName::$tplVars, $tplVars);

					eval('$tmpTplFile = ' . $modName . '::$tplFile;');
					eval('$tmpTplVars = ' . $modName . '::$tplVars;');

					# If template file is true the file-name should be same as module-name
					$tplFile = $tmpTplFile === true ? $module : $tmpTplFile;

					# Merge module's template variables with added ones
					$tplVars = array_merge((array)$tmpTplVars, $tplVars);

					# Stop here, only grab template vars and file from last prio site
					break;
				}
			}

			# If tplFile is false that means the module doesn't want to display any template
			if ($tplFile === false) {
				return false;
			}
			# If it's still null (since declaration) no module-class existed
			# and tpl-name is assumed to be module-name
			else if ($tplFile === null) {
				$tplFile = $module;
			}

			# Now that we have the template-file, go through all sites 
			# and get Before, Middle and After-templates
			foreach ($sites as $site) {
				# If we're admin fetch templates suffixed with Admin instead (if they exist)
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

				# If we've found before, middle _and_ after templates there's no need to go on
				if ($before != '' and $middle != '' and $after != '') {
					break;
				}
			}

			$all = $before .$middle .$after;

			# If $child_modules is set (could be several modules) and $all doesn't contain
			# it that means none of the module's template echo:ed $child_modules, append them autoamtically
			if (isset($tplVarsAdd['child_modules']) and !empty($tplVarsAdd['child_modules']) and false === strpos($all, $tplVarsAdd['child_modules'])) {
				$all .= $tplVarsAdd['child_modules'];
			}

			return $all == '' ? false : $all;
		}

		/**
		 * fetchTpl
		 *
		 * Extracts tpl-vars into function-scope, turns off errors, 
		 * includes and returns template
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
