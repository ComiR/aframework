<?php
	/**
	 * aFramework is an extremely basic
	 * framework, designed to allow easy and
	 * free modular design and simple ajax-integration
	 * without being too complex or too limiting
	 *
	 * @author Andreas Lagerkvist
	 * @url http://exscale.se
	 * @date 2008-01-09 -> (in development)
	 * @copyright (c) Andreas Lagerkvist 2008, Some Rights Reserved
	 */

	# Include Init File
	require_once(str_replace('//', '/', $_SERVER['DOCUMENT_ROOT'] .'/') .'__core/Init.php');

	/**
	 * Main class, runs and renders a
	 * collection of modules stored in
	 * an xml page-type (__core/PageTypes/)
	 *
	 * @class aFramework
	 */
	class aFramework {
		/**
		 * Runs either a page-type or a single module
		 *
		 * @method run
		 */
		public function run() {
			global $_TPLVARS;
			global $_PARAMS;

			$this->handleStyle();
			$this->handleVisitorData();

			if(isset($_GET['mod'])) {
				$this->runModule($_GET['mod']);
			}
			else {
				$this->runPageType();
			}
		}
		
		/**
		 * Handles style-switching
		 *
		 * @method handleStyle
		 */
		private function handleStyle() {
			if(!ALLOW_STYLES) {
				return false;
			}

			$tmp = array_merge($_GET, $_POST);
			$style = (isset($tmp['style'])) ? str_replace(array('..\\', '../', '/', '\\'), '', $tmp['style']) : false;

			if($style !== false and file_exists(STYLES_DIR .$style .'/style.css')) {
				setcookie('style', $style, time()+60*60*24*365, '/');
				redirect('?changed_style');
			}
		}
		

		/**
		 * Handles setting and getting of visitor-data
		 *
		 * @method handleVisitorData
		 */
		private function handleVisitorData() {
			global $_TPLVARS;

			if(isset($_REQUEST['remember']) and $_REQUEST['remember']) {
				setVisitorData($_REQUEST);

				$_TPLVARS['visitor'] = $_REQUEST;
				$_TPLVARS['visitor']['remembered'] = true;
			}
			else {
				$_TPLVARS['visitor'] = getVisitorData();
			}
		}

		/**
		 * Fetches a template
		 *
		 * @method fetchTpl
		 */
		private function fetchTpl($f, $hideErrors = true) {
			global $_TPLVARS;
			global $_PARAMS;

			if (is_file($f)) {
				if($hideErrors) {
					ini_set('display_errors', false);
				}

				foreach($_TPLVARS as $mod => $v) {
					$$mod = $v;
				}

				ob_start();
				include $f;
				$contents = ob_get_contents();
				ob_end_clean();

				# Shouldn't assume that errors should be displayed
				if($hideErrors) {
					ini_set('display_errors', true);
				}

				return $contents;
			}

			return false;
		}

		/**
		 * Runs and renders a single module
		 *
		 * @method runModule
		 */
		private function runModule($mod) {
			global $_TPLVARS;
			global $_PARAMS;

			# Check that a module is set
			$module = (isset($mod)) ? str_replace(array('..\\', '../', '/', '\\'), '', $mod) : false;

			# Check if there's a module-class or only a tpl
			$hasClass = file_exists(MODULES_DIR ."$module/$module" .'Module.php');
			$hasTpl = file_exists(MODULES_DIR ."$module/$module.tpl.php");

			if($hasClass or $hasTpl) {
				if($hasClass) {
					# Include module file
					$moduleName = $module .'Module';
					require_once(MODULES_DIR ."$module/$moduleName.php");

					# Create new instance and runt it
					$mod = new $moduleName();
					$mod->run();
				}

				# See which tpl should be used (Modules can use TPLVARS to set different TPLs (dodgy...? mmm..))
				$tplFile = (isset($_TPLVARS[$module .'TplFile'])) ? $_TPLVARS[$module .'TplFile'] : $module;

				# Make sure it exists
				if(file_exists(MODULES_DIR ."$module/$tplFile.tpl.php")) {
					$renderedModule = $this->fetchTpl(MODULES_DIR ."$module/$tplFile.tpl.php");

					# Echo the module
					echo $renderedModule;
				}
			}
		}

		/**
		 * Runs and renders a single page-type
		 *
		 * @method runPageType
		 */
		private function runPageType() {
			global $_TPLVARS;
			global $_PARAMS;

			$_PARAMS['page_type'] = $pageType = $this->getPageTypeFromURI();

			# Make sure this page-type exists, else die!
			if(!file_exists(PAGE_TYPES_DIR ."$pageType.xml")) {
				die("FATAL ERROR: The page-type '$pageType' does not exist!!");
			}

			# Now compile this page-type
			$output = $this->compilePageType($pageType);

			# See if any module wanted to force different page-type
			# (Modules can se new page-type through TPLVARS (dodgyyy))
			if(isset($_TPLVARS['PageType'])) {
				$_PARAMS['page_type'] = $_TPLVARS['PageType'];
				$output = $this->compilePageType($_TPLVARS['PageType']);
			}

			echo $output;
		}

		/**
		 * Parses an xml page-type then runs and
		 * renders the modules contained within
		 *
		 * @method compilePageType
		 * @param {String} $pageType, the page-type to compile
		 */
		private function compilePageType($pageType) {
			# Open the page-type we're compiling and get the root-module (always Base)
			$doc = new DOMDocument();
			$doc->load(PAGE_TYPES_DIR .$pageType .'.xml');
			$rootModule = $doc->getElementsByTagName('Base');

			$this->runModules($rootModule);
			$pageTypeCompiled = $this->fetchModules($rootModule);

			return $pageTypeCompiled;
		}

		/**
		 * Runs modules
		 *
		 * @method runModules
		 * @param {Array} $modules, array of modules to run
		 */
		private function runModules($modules) {
			$notElements = array('#text', '#comment', '#cdata-section');

			foreach($modules as $module) {
				# Make sure this isn't a comment or something like that
				if(!in_array(strtolower($module->nodeName), $notElements)) {
					$moduleName = $module->nodeName .'Module';

					# If this is a wrapper-module, just run its children
					if(strtolower($module->nodeName) == 'wrapper') {
						if($module->hasChildNodes()) {
						 	$this->runModules($module->childNodes);
						}
					}
					# Not a wrapper, make sure module-class exists (modules don't necesarily need a class)
					elseif(file_exists(MODULES_DIR .$module->nodeName ."/$moduleName.php")) {
						# Include module file
						require_once(MODULES_DIR .$module->nodeName ."/$moduleName.php");

						# Create new instance and run it
						$mod = new $moduleName();
						$mod->run();

						# This module has child-modules, run them as well
						if($module->hasChildNodes()) {
							 $this->runModules($module->childNodes);
						}
					}
				}
			}
		}

		/**
		 * Fetches modules
		 *
		 * @method fetchModules
		 * @param {Array} $modules, array of modules to fetch
		 */
		private function fetchModules($modules) {
			global $_TPLVARS;
			$page = '';
			$i = 0;
			$notElements = array('#text', '#comment', '#cdata-section');

			foreach($modules as $module) {
				# If this node is an actual module (not a comment or something)
				if(!in_array($module->nodeName, $notElements)) {
					$childModules = false;

					# If this module has child-modules and it's not a wrapper-module
					if($module->hasChildNodes() and strtolower($module->nodeName) != 'wrapper') {
						# Fetch them first and store them in $_TPLVARS['child_modules']
						$_TPLVARS['child_modules'] = $this->fetchModules($module->childNodes);
					}
					# If it's a wrapper-module, store the childModules in $childModules (to be printed downstairs)
					elseif($module->hasChildNodes() and strtolower($module->nodeName) == 'wrapper') {
						$childModules = $this->fetchModules($module->childNodes);
					}

					# Check if a custom tpl-file is set in the form of ModuleNameTplFile
					# TplFile may also be 'false' (display no template)
					$tplFile = 	(isset($_TPLVARS[$module->nodeName .'TplFile'])) 
								? $_TPLVARS[$module->nodeName .'TplFile']
								: $module->nodeName ;

					# See if tpl really exists (or if it's a wrapper)
					if(file_exists(MODULES_DIR .$module->nodeName ."/$tplFile.tpl.php") or strtolower($module->nodeName) == 'wrapper') {
						# Separate modules with horizontal rulers (but not if it's the first module in the scope)
						# It looks nice on naked day :)
						if($i > 0) {
							$page .= "\n\n<hr />";
						}

						# Automatically add a container-div around every module except Base
						# This is done mainly so ajax-calls to modules will not contain the same wrapper-div the response is going in
						if(AUTO_DIV and $module->nodeName != 'Base') {
							# If it's a wrapper-element use its name-attribute rather than its node-name for the div-id
							$id = (strtolower($module->nodeName) == 'wrapper') ? strtolower(ccFix($module->getAttribute('name'))) : strtolower(ccFix($module->nodeName, '-'));

							$page .= "\n\n<div id=\"$id\">\n\n";
						}

						# Do not fetch wrapper-"modules", they are nothing but container divs
						if(strtolower($module->nodeName) != 'wrapper') {
							$page .= $this->fetchTpl(MODULES_DIR .$module->nodeName ."/$tplFile.tpl.php");
						}
						elseif($childModules) {
							$page .= $childModules;
						}

						if(AUTO_DIV and $module->nodeName != 'Base') {
							$page .= "\n\n</div>";
						}

						$i++;
					}

					# Unset so next template don't get same children
					$_TPLVARS['child_modules'] = false;
					$childModules = false;
				}
			}

			return $page;
		}

		/**
		 * Routing stuff, originally by THR, comments removed
		 */
		private function loadRoutesFromFile($file) {
			$transformed = array();
			$routes = include $file;

			foreach ($routes as $uri => $page) {
				$uriRegex = preg_replace('~:([a-z]+)~', '(?P<$1>[^/]+)', $uri);
				$transformed[$uriRegex] = $page;
			}

			return $transformed;
		}

		private function getVirtualURI() {
			list($uri)	= explode('?', $_SERVER['REQUEST_URI']);
			$scriptPath	= $_SERVER['SCRIPT_NAME'];
			$slashPos	= strrpos($scriptPath, '/');
			$dir		= preg_quote(substr($scriptPath, 0, $slashPos));
			$file		= preg_quote(substr($scriptPath, $slashPos));
			$uri		= preg_replace("~^$dir($file)?~i", '', $uri);

			return '/' . trim($uri, '/');
		}

		private function getPageTypeFromURI() {
			global $_PARAMS;

			$virtualURI	= $this->getVirtualURI();
			$routes		= $this->loadRoutesFromFile(CORE_DIR .'Routes.php');

			foreach ($routes as $uriRegex => $page) {
				if (preg_match('~^'.$uriRegex.'$~i', $virtualURI, $match)) {
					$_PARAMS = array_slice($match, 1);

					break;
				}

				$page = false;
			}

			if (!$page) {
				return 'FourOFour';
			}
			else {
				return $page;
			}
		}
	}
?>