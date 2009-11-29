<?php
	/**
	 * Router
	 *
	 * Analyses the URI and sets appropriate GET-vars based on the current sites Routes.php-file
	 **/
	final class Router {
		private static $routes = false;
		public static $params = array();

		/**
		 * run
		 * 
		 * Loads all the routes and merges the params with GET-array
		 **/
		public static function run ($uri) {
			$sites = explode(' ', SITE_HIERARCHY);

			# Load all routes
			foreach ($sites as $site) {
				$routesFile = DOCROOT . $site . '/Routes.php';

				if (file_exists($routesFile)) {
					self::$routes = array_merge((array)self::$routes, include $routesFile);
				}
			}

			self::$routes = array_filter(self::$routes);

			self::sortRoutes();

			self::$params = self::getParamsFromURI($uri);

			# So that modules that read Router::$params work on ajax-requests
			if (XHR) {
				self::$params = array_merge(self::$params, $_GET);
			}

		#	header('Content-type: text/plain');
		#	var_dump(Router::getRoutes());
		#	var_dump($_GET);
		#	echo Router::urlFor($_GET['controller']) ."\n";
		#	echo Router::urlFor('Article', array(
		#		'url_str' => 'hej', 
		#		'year' => '2008', 
		#		'month' => '12'
		#	)) ."\n";
		#	echo Router::urlFor('Article', array(
		#		'url_str' => 'hej', 
		#		'year' => '2008', 
		#		'month' => '12', 
		#		'day' => '1', 
		#		'daytona' => 'piss', 
		#		'url' => 'something'
		#	)) ."\n";
		#	echo Router::urlForModule('Article') ."\n";
		#	echo Router::urlForFile('/fonts/', 'aFramework') ."\n";
		#	echo Router::urlForFile('/fonts/');
		#	die;
		}

		private static function sortRoutes () {
			$hardCoded	= array();
			$variable	= array();

			foreach (self::$routes as $uri => $controller) {
				if (false === strpos($uri, ':')) {
					$hardCoded[$uri] = $controller;
				}
				else {
					$variable[$controller] = $uri;
				}
			}

		#	uasort($variable, array('self', 'routeSortingCallback'));

			self::$routes = array_merge($hardCoded, array_flip($variable));
		}

		private static function routeSortingCallback ($a, $b) {
			$aLen = strlen($a);
			$bLen = strlen($b);

			if ($aLen == $bLen) {
				return 0;
			}
			elseif ($aLen > $bLen) {
				return 1;
			}
			else {
				return -1;
			}
		}

		public static function getRoutes () {
			return self::$routes;
		}

		public static function urlize ($str) {
			return strtolower(preg_replace('/[^A-Za-z0-9_-]/', '', $str));
		}

		/**
		 * urlForModule
		 * 
		 **/
		public static function urlForModule ($mod) {
			return WEBROOT . '?module=' . $mod;
		}

		/**
		 * urlForFile
		 * 
		 **/
		public static function urlForFile ($path, $site = false, $prefix = WEBROOT) {
			$site = $site ? $site : CURRENT_SITE;

			return str_replace('//', '/', $prefix . $site . '/Files/' . $path);
		}

		public static function urlForLang ($lang) {
			$url = WEBROOT;

			if ($lang == Config::get('general.default_lang')) {
				return $url;
			}

			if (!USE_MOD_REWRITE) {
				$url .= 'index.php/';
			}

			return $url . "$lang/";
		}

		/**
		 * urlFor
		 * 
		 * Uses the $routes and $attrs passed by user to construct
		 * a proper URL for a particular controller
		 * <a href="<?=Router::urlFor('Article', $article);?>"><?=$article['title'];? ></a>
		 **/
		public static function urlFor ($requestedController, $attrs = array()) {
			$url = false;

			foreach (self::$routes as $match => $controller) {
				if ($controller == $requestedController) {
					# Remove variable-definitions and possible regexps
					$url = str_replace(':', '', $match);
					$url = preg_replace('/\(.*?\)/', '', $url);

					# May be dangerous to just str_replace here (/:cat_url_str/:url_str.htm will fuck up for example... may have to check each directory individually)
					foreach ($attrs as $k => $v) {
						$url = str_replace($k, $v, $url);
					}

					break;
				}
			}

			$langPrefix	= CURRENT_LANG == Config::get('general.default_lang') ? '' : '/' . CURRENT_LANG;
			$webroot	= USE_MOD_REWRITE ? WEBROOT : (($requestedController == 'Home' and empty($langPrefix)) ? WEBROOT : WEBROOT . 'index.php/');
			$url		= $url ? str_replace('//', '/', $webroot . $langPrefix . $url) : '#';

			return $url;
		}

		/**
		 * getParamsFromURI
		 * 
		 * Analyses the URI and tries to match it to a route stored in $routes
		 * If a match is found returns array with controller and attrs set, else returns 404-controller
		 **/
		private static function getParamsFromURI ($uri = '/') {
			$requested		= explode('/', $uri);
			$countRequested	= count($requested);
			$params			= array();
			$isValid		= false;

			foreach (self::$routes as $match => $controller) {
				$matched	= explode('/', $match);

				# The requested URI has the same amount of dirs as the route
				if (count($matched) == $countRequested) {
					$isValid = true;

					# Make sure the directories match
					for ($i = 0; $i < $countRequested; $i++) {
						# See if this route-dir contains a file-extension (first remove any regexp)
						$tmp = preg_replace('/\(.*?\)/', '', $matched[$i]);

						if (strstr($tmp, '.')) {
							if (end(explode('.', $tmp)) != end(explode('.', $requested[$i]))) {
								$isValid = false;
								break;
							}
						}
						# See if this route-dir is a variable
						if (':' == substr($matched[$i], 0, 1)) {
							# See if this var contains a reg-exp-match
							if (strstr($matched[$i], '(')) {
								$regExp = explode('(', $matched[$i]);
								$regExp = substr($regExp[1], 0, -1);

								if (!preg_match("/^$regExp$/", $requested[$i])) {
									$isValid = false;
									break;
								}
							}
							# Else - anything is valid
						}
						# It's a hard-coded value
						elseif ($matched[$i] != $requested[$i]) {
							$isValid = false;
							break;
						}
					}
					# If isValid is still true that means we've successfully matched a URI, set params and break
					if ($isValid) {
						$params['controller'] = $controller;
						$i = 0;

						# Set all the params in the route
						foreach ($matched as $m) {
							if(':' == substr($m, 0, 1)) {
								# Remove colon
								$m = substr($m, 1);

								# Remove regexp
								$m = preg_replace('/\(.*?\)/', '', $m);

								$val = $requested[$i];

								# Remove file-extension
								if(strstr($m, '.')) {
									$tmpExt	= end(explode('.', $m));
									$m		= substr($m, 0, -(strlen($tmpExt) + 1));

									$tmpExt = end(explode('.', $requested[$i]));
									$val	= substr($val, 0, -(strlen($tmpExt) + 1));
								}

								# Set params
								$params[$m] = $val;
							}

							$i++;
						}

						break;
					}
				}
			}

			# We couldn't find a valid route
			if (!$isValid) {
				$params['controller'] = false;
			}

			return $params;
		}
	}
?>
