<?php
	class aFramework_ModuleAdminModule {
		public static $tplVars		= array();
		public static $tplFile		= true;

		private static $notModules	= array(
			'.', 
			'..', 
			'.svn', 
			'Base', 
			'Debug',
			'Captcha', 
			'WeatherInfo', 
			'CodeCompressor', 
			'JSPacker', 
			'ModuleAdmin', 
			'#text', 
			'#comment', 
			'#cdata-section'
		);

		/**
		 * run
		 *
		 **/
		public static function run() {
			if(!ADMIN) {
				return self::$tplFile = false;
			}

			$controller = isset($_GET['controller']) ? $_GET['controller'] : 'Home';

			# Get all available modules for this site
			self::$tplVars = self::getAvailableModules($controller);

			# Someone wants to add a module to the controller
			if(isset($_POST['module_admin_add_module'])) {
				$insertBefore = $_POST['add_type'] == 'before' ? true : false;

				if(!('Base' == $_POST['target'] and $insertBefore)) {
					self::addModuleToController($_POST['module_to_add'], $_POST['target'], $insertBefore, $_POST['controller_in_use']);
				}

				if(!XHR) {
					redirect('?added_module');
				}
			}

			# Someone wants to remove a module from the controller
			if(isset($_POST['module_admin_remove_module'])) {
				self::removeModuleFromController($_POST['module_to_remove'], $_POST['controller_in_use']);

				if(!XHR) {
					redirect('?removed_module');
				}
			}
		}

		/**
		 * getAvailableModules
		 *
		 * Gets all available modules for this site (to be listed in module-listing)
		 **/
		private static function getAvailableModules($controller) {
			$sites					= explode(' ', SITE_HIERARCHY);
			$availableModules		= array();
			$usedModules			= array();
			$modulesInController	= self::getModulesInController($controller);

			foreach($sites as $site) {
				$modulesDir = DOCROOT .$site .'/Modules/';

				if(is_dir($modulesDir)) {
					$dh = opendir($modulesDir);

					while($f = readdir($dh)) {
						if(!in_array($f, self::$notModules) and is_dir($modulesDir .$f)) {
							if(array_key_exists($f, $modulesInController)) {
								$availableModules[$f]['name']		= $f;
								$availableModules[$f]['in_use']		= true;
								$availableModules[$f]['html_id']	= strtolower(ccFix($f));
							}
							else {
								$usedModules[$f]['name']			= $f;
								$usedModules[$f]['in_use']			= false;
								$usedModules[$f]['html_id']			= strtolower(ccFix($f));
							}
						}
					}
				}
			}

			sort($availableModules);
		#	sort($usedModules);

			$modules = array_merge($usedModules, $availableModules);

			return array('available_modules' => $modules, 'modules_in_controller' => $modulesInController);
		}

		/**
		 * getModulesInController
		 *
		 * Gets all modules in the currently used controller (so we can differentiate between used and unused modules)
		 * These also include 
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
					$modName = $mod->nodeName == 'Wrapper' ? $mod->nodeName .':' .$mod->getAttribute('name') : $mod->nodeName;
					$mods[$modName] = array(
						'name'		=> $modName, 
						'html_id'	=> $mod->nodeName == 'Wrapper' ? $mod->getAttribute('name') : strtolower(ccFix($mod->nodeName))
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
				$path = DOCROOT .$site .'/Controllers/' .$controller .'.xml';

				if(file_exists($path)) {
					return $path;
				}
			}
		}

		/**
		 * addModuleToController
		 *
		 **/
		private static function addModuleToController($module, $target, $insertBefore = false, $controller) {
			# Load the controller
			$path	= self::getControllerPath($controller);
			$doc	= new DOMDocument();

			$doc->load($path);

			# Create the new node
			$newModule = $doc->createElement($module);

			# If target it's a wrapper-node, get name-attr
			$wrapperName = false;

			if('Wrapper' == substr($target, 0, 7)) {
				$wrapperInfo	= explode(':', $target);
				$wrapperName	= $wrapperInfo[1];
				$target			= $wrapperInfo[0];
			}

			$targetModules = $doc->getElementsByTagName($target);

			foreach($targetModules as $mod) {
				# If target is a wrapper, check that the name is correct
				if($wrapperName) {
					if($wrapperName == $mod->getAttribute('name')) {
						if($insertBefore) {
							$mod->parentNode->insertBefore($newModule, $mod); 
						}
						else {
							$mod->appendChild($newModule); 
						}
						break;
					}
				}
				# Otherwise just add at first occurence
				else {
					if($insertBefore) {
						$mod->parentNode->insertBefore($newModule, $mod); 
					}
					else {
						$mod->appendChild($newModule); 
					}
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

			foreach($modules as $m) {
				$mod = $m;
				break;
			}

			$mod->parentNode->removeChild($mod);

			file_put_contents($path, $doc->saveXML());

			return true;
		}
	}
?>
