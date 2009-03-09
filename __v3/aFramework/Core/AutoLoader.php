<?php
	class AutoLoader {
		public static function load($class) {
			# Only Modules-classes should contain _
			if(strstr($class, '_')) {
				$bits = explode('_', $class);
				$path = DOCROOT .$bits[0] .'/Modules/' .substr($bits[1], 0, -6) .'/' .$bits[1] .'.php';

				if(file_exists($path)) {
					require_once $path;
				}
				else {
					die("$path does not exist");
				}
			}
			# It's a Lib or DBLib-class
			else {
				$sites = explode(' ', SITE_HIERARCHY);

				foreach($sites as $site) {					
					if(file_exists(DOCROOT .$site .'/Lib/' .$class .'.php')) {
						require_once DOCROOT .$site .'/Lib/' .$class .'.php';
						break;
					}
					elseif(file_exists(DOCROOT .$site .'/DBLib/' .$class .'.php')) {
						require_once DOCROOT .$site .'/DBLib/' .$class .'.php';
						break;
					}
				}
			}
		}
	}
?>