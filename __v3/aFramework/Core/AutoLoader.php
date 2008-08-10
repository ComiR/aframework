<?php
	class AutoLoader {
		public static function load($class) {
			# Only Modules-classes should contain _
			if(strstr($class, '_')) {
				$bits = explode('_', $class);
				$path = ROOT_DIR .$bits[0] .'/Modules/' .str_replace('Module', '', $bits[1]) .'/' .$bits[1] .'.php';

				if(file_exists($path)) {
					require_once $path;
				}
			}
			# It's a Lib or DBLib-class
			else {
				$sites = explode(' ', SITE_HIERARCHY);
			
				foreach($sites as $site) {					
					if(file_exists(ROOT_DIR .$site .'/Lib/' .$class .'.php')) {
						require_once ROOT_DIR .$site .'/Lib/' .$class .'.php';
						break;
					}
					elseif(file_exists(ROOT_DIR .$site .'/DBLib/' .$class .'.php')) {
						require_once ROOT_DIR .$site .'/DBLib/' .$class .'.php';
						break;
					}
				}
			}
		}
	}
?>