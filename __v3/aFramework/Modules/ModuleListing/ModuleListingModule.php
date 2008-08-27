<?php
	class aFramework_ModuleListingModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		private static $notModules = array(
			'..', 
			'.', 
			'.svn', 
			'Base', 
			'CodeCompressor', 
			'CSSCompressor', 
			'JSCompressor', 
			'ModuleListing', 
			'Debug',
			'#text', 
			'#comment', 
			'#cdata-section'
		);

		/**
		 * run
		 *
		 **/
		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			$controller = isset($_GET['controller']) ? $_GET['controller'] : 'Home';

			# Get all available modules for this site
			self::$tplVars['modules'] = self::getAvailableModules($controller);

			foreach(self::$tplVars['modules'] as $mod) {
				if($mod['in_use']) {
					self::$tplVars['modules_in_controller'][] = $mod;
				}
			}

			# Someone wants to add a module to the controller
			if(isset($_REQUEST['module_listing_add_module'])) {
				self::addModuleToController($_REQUEST['module_to_add'], $_REQUEST['target'], $_REQUEST['before'], $_REQUEST['controller_in_use']);

				if(!XHR) {
					redirect('?added_module');
				}
			}

			# Someone wants to remove a module from the controller
			if(isset($_REQUEST['module_listing_remove_module'])) {
				self::removeModuleFromController($_REQUEST['module_to_remove'], $_REQUEST['controller_in_use']);

				if(!XHR) {
					redirect('?removed_module');
				}
			}
		}

		/**
		 * getAvailableModules
		 *
		 **/
		private static function getAvailableModules($controller) {
			$sites = explode(' ', SITE_HIERARCHY);
			$modules = array();

			foreach($sites as $site) {
				$modulesDir = ROOT_DIR .$site .'/Modules/';

				if(is_dir($modulesDir)) {
					$dh = opendir($modulesDir);

					while($f = readdir($dh)) {
						if(!in_array($f, self::$notModules) and is_dir($modulesDir .$f)) {
							$modules[$f]['name'] = $f;
							$modules[$f]['in_use'] = false;
							$modules[$f]['html_id'] = strtolower(ccFix($f));
						}
					}
				}
			}

			$modules = array_merge($modules, self::getModulesInController($controller));

			sort($modules);

			return $modules;
		}

		/**
		 * getModulesInController
		 *
		 **/
		private static function getModulesInController($controller) {
			$path = self::getControllerPath($controller);

			$doc = new DOMDocument();
			$doc->load($path);

			return self::__getModulesInController($doc->getElementsByTagName('Base'));
		}

		/**
		 * __getModulesInController
		 *
		 **/
		private static function __getModulesInController($modules) {
			$mods = array();

			foreach($modules as $mod) {
				if(!in_array($mod->nodeName, self::$notModules)) {
					$mods[$mod->nodeName] = array(
						'name' => $mod->nodeName, 
						'in_use' => true, 
						'html_id' => $mod->nodeName == 'Wrapper' ? $mod->getAttribute('name') : strtolower(ccFix($mod->nodeName))
					);
				}

				if($mod->hasChildNodes()) {
					$mods = array_merge($mods, self::__getModulesInController($mod->childNodes));
				}
			}

			return $mods;
		}

		/**
		 * getControllerPath
		 *
		 **/
		private static function getControllerPath($controller) {
			$sites = explode(' ', SITE_HIERARCHY);
			$path = false;

			foreach($sites as $site) {
				$path = ROOT_DIR .$site .'/Controllers/' .$controller .'.xml';

				if(file_exists($path)) {
					break;
				}
			}

			return $path;
		}

		/**
		 * addModuleToController
		 *
		 **/
		private static function addModuleToController($module, $target, $before = false, $controller) {
			# Load the controller
			$path = self::getControllerPath($controller);
			
			$doc = new DOMDocument();
			$doc->load($path);

			# Create the new node
			$newModule = $doc->createElement($module);

			# Either insert before other node
			if($before) {
				$beforeModules = $doc->getElementsByTagName($before);

				foreach($beforeModules as $mod) {
					$mod->parentNode->insertBefore($newModule, $mod); 
					break;
				}
			}
			# Or append to target
			else {
				$targetModules = $doc->getElementsByTagName($target);
				
				foreach($targetModules as $mod) {
					$mod->appendChild($newModule);
					break;
				}
			}

			file_put_contents($path, $doc->saveXML());

			return true;
		}

		/**
		 * removeModuleFromController
		 *
		 **/
		private static function removeModuleFromController($module, $controller) {
			$path = self::getControllerPath($controller);

			$doc = new DOMDocument();
			$doc->load($path);

			$modules = $doc->getElementsByTagName($module);
			$mod = false;

			foreach($modules as $r) {
				$mod = $r;
				break;
			}

			$mod->parentNode->removeChild($mod);

			file_put_contents($path, $doc->saveXML());

			return true;
		}
	}
?>