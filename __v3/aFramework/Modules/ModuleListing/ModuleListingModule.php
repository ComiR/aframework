<?php
	class aFramework_ModuleListingModule {
		public static $tplVars = array();
		public static $tplFile = true;
		public static $forceController = false;

		/**
		 * run
		 *
		 **/
		public static function run() {
			self::$tplVars = array();
			self::$tplFile = true;
			self::$forceController = false;

			$controller = isset($_GET['controller']) ? $_GET['controller'] : 'Home';

			self::$tplVars['modules'] = self::getAvailableModules($controller);

			foreach(self::$tplVars['modules'] as $mod) {
				if($mod['in_use']) {
					self::$tplVars['modules_in_controller'][] = $mod;
				}
			}

			if(isset($_REQUEST['module_listing_add_module'])) {
				self::addModuleToController($_REQUEST['module'], $_REQUEST['target'], $_REQUEST['before'], $controller);

				if(!XHR) {
					redirect('?added_module');
				}
			}

			if(isset($_REQUEST['module_listing_remove_module'])) {
				self::removeModuleFromController($_REQUEST['module'], $controller);

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
			$notModules = array(
				'..', 
				'.', 
				'.svn', 
				'Base', 
				'CodeCompressor', 
				'CSSCompressor', 
				'JSCompressor', 
				'ModuleListing', 
				'Debug'
			);
			$sites = explode(' ', SITE_HIERARCHY);
			$modules = array();
			$modulesInController = self::getModulesInController($controller);

			foreach($sites as $site) {
				$moduleDir = ROOT_DIR .$site .'/Modules/';

				if(is_dir($moduleDir)) {
					$dh = opendir($moduleDir);

					while($f = readdir($dh)) {
						if(!in_array($f, $notModules) and is_dir($moduleDir .$f)) {
							$modules[$f]['name'] = $f;
							$modules[$f]['in_use'] = in_array($f, $modulesInController);
							$modules[$f]['html_id'] = strtolower(ccFix($f));
						}
					}
				}
			}

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
				$mods[] = $mod->nodeName;

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

			$bases = $doc->getElementsByTagName('Base');
			$base = false;

			foreach($bases as $b) {
				$base = $b;
				break;
			}

			$removers = $doc->getElementsByTagName($module);
			$mod = false;

			foreach($removers as $r) {
				$mod = $r;
				break;
			}

			$base->removeChild($mod);

			file_put_contents($path, $doc->saveXML());

			return true;
		}
	}
?>