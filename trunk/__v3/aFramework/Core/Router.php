<?php
	/**
	 * Router
	 *
	 * Analyses the URI and sets appropriate GET-vars based on the current sites Routes.php-file
	 **/
	final class Router {
		public static $params		= array();
		private static $controller	= false;
		private static $uri			= false;
		private static $routes		= false;

		/**
		 * run
		 * 
		 * Loads all the routes and merges the params with GET-array
		 **/
		public static function run ($uri = '/') {
			self::$uri = $uri;
			self::loadRoutes();
			self::sortRoutes();
			self::getParamsFromURI();

			# So that modules that read Router::$params work on ajax-requests
			if (XHR) {
				self::$params = array_merge(self::$params, $_GET);
			}
		}

		/**
		 * getController
		 * 
		 * Returns the controller determined by the URI
		 **/
		public static function getController () {
			return self::$controller;
		}

		/**
		 * loadRoutes
		 * 
		 * Loads all the routes
		 **/
		private static function loadRoutes () {
			$sites = explode(' ', SITE_HIERARCHY);

			# Load all routes
			foreach ($sites as $site) {
				$routesFile = DOCROOT . $site . '/Routes.php';

				if (file_exists($routesFile)) {
					self::$routes = array_merge((array)self::$routes, include $routesFile);
				}
			}

			self::$routes = array_filter(self::$routes);
		}

		/**
		 * test
		 * 
		 * Just a test, not in use
		 **/
		private static function test () {
			header('Content-type: text/plain');
			var_dump(Router::getRoutes());
			var_dump($_GET);
			echo Router::urlFor($_GET['controller']) ."\n";
			echo Router::urlFor('Article', array(
				'url_str' => 'hej', 
				'year' => '2008', 
				'month' => '12'
			)) ."\n";
			echo Router::urlFor('Article', array(
				'url_str' => 'hej', 
				'year' => '2008', 
				'month' => '12', 
				'day' => '1', 
				'daytona' => 'piss', 
				'url' => 'something'
			)) ."\n";
			echo Router::urlForModule('Article') ."\n";
			echo Router::urlForFile('/fonts/', 'aFramework') ."\n";
			echo Router::urlForFile('/fonts/');
			die;
		}

		/**
		 * sortRoutes
		 * 
		 * Sorts the routes so that the "hard-coded" ones come first
		 **/
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

		/**
		 * routeSortingCallback
		 * 
		 * Used to sort variable routes by strlen, not in use
		 **/
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

		/**
		 * getRoutes
		 * 
		 * Returns all loaded routes
		 **/
		public static function getRoutes () {
			return self::$routes;
		}

		/**
		 * urlize
		 * 
		 * Turns $str into a valid url
		 **/
		public static function urlize ($str) {
			return preg_replace('/[^a-z0-9_-]/', '', str_replace(array('å', 'ä', 'ö', ' '), array('a', 'a', 'o', '-'), strtolower($str)));
		}

		/**
		 * urlForModule
		 * 
		 * Returns the URL for a particular module
		 **/
		public static function urlForModule ($mod) {
			$langPrefix	= '';
			$urlPrefix	= '';

			if (CURRENT_LANG != Config::get('lang.default_lang')) {
				$langPrefix = CURRENT_LANG . '/';
			}

			if (!USE_MOD_REWRITE) {
				$urlPrefix = 'index.php/';
			}

			return WEBROOT . $urlPrefix . $langPrefix . '?module=' . $mod;
		}

		/**
		 * urlForUtil
		 * 
		 * Returns the URL for a particular util
		 **/
		public static function urlForUtil ($util) {
			return WEBROOT . 'aFramework/Utils/' . $util . '.php';
		}

		/**
		 * urlForFile
		 * 
		 * Returns the URL for a particular file in a
		 * particular site (or current site), defaults to 
		 * webroot-prefix but can be set to docoroot instead...
		 **/
		public static function urlForFile ($path, $site = false, $prefix = WEBROOT) {
			$site = $site ? $site : CURRENT_SITE;

			return str_replace('//', '/', $prefix . $site . '/Files/' . $path);
		}

		/**
		 * urlForLang
		 * 
		 * Returns the URL for a lang ('en' => '/root/', 'sv' => '/root/sv/')
		 **/
		public static function urlForLang ($lang) {
			$url = WEBROOT;

			if ($lang == Config::get('lang.default_lang')) {
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

			$langPrefix	= CURRENT_LANG == Config::get('lang.default_lang') ? '' : '/' . CURRENT_LANG;
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
		private static function getParamsFromURI () {
			$uri			= self::$uri;			# Requested URI
			$routes			= self::$routes;		# All loaded routes
			$requested		= explode('/', $uri);	# Each requested dir ('/archives/design/' => [archives, design])
			$countRequested	= count($requested);	# Number of requested dirs
			$params			= array();				# For storing the params retrieved from the URI
			$isValid		= false;				# Whether the requested URI is valid (matches a route)

			# Go through each route (/:url_str/ => Page for example)
			foreach ($routes as $match => $controller) {
				# Each matched dir (/archives/:url_str/ => [archives, :url_str])
				$matched = explode('/', $match);

				# Make sure the requested URI has the same amount of dirs as the route
				# TODO: Should add support for any number of dirs in route: (/product-categories/:category_id[]/)
				if (count($matched) == $countRequested) {
					$isValid = true;

					# Make sure the directories match
					for ($i = 0; $i < $countRequested; $i++) {
						# First remove any regexp
						$matchedDirNoRegexp = preg_replace('/\(.*?\)/', '', $matched[$i]);

						# See if this route-dir contains a file-extension
						if (strstr($matchedDirNoRegexp, '.')) {
							# Make sure the extension matches the route AND the uri
							# I.E. /:url_str.htm would match /foo.htm but not /foo.png
							if (end(explode('.', $matchedDirNoRegexp)) != end(explode('.', $requested[$i]))) {
								# Otherwise not a valid request
								$isValid = false;
								break;
							}
						}

						# See if this route-dir is a variable
						if (':' == substr($matched[$i], 0, 1)) {
							# See if this var contains a reg-exp-match
							if (strstr($matched[$i], '(')) {
								# It does, break out the regexp
								$regExp = explode('(', $matched[$i]);
								$regExp = substr($regExp[1], 0, -1);

								# If the requested dir doesn't match it's not a valid request
								if (!preg_match("/^$regExp$/", $requested[$i])) {
									$isValid = false;
									break;
								}
							}
							# Else - no regexp, anything is valid
						}
						# It's a hard-coded value, make sure the two dirs are identical
						elseif ($matched[$i] != $requested[$i]) {
							$isValid = false;
							break;
						}
					}

					# If isValid is still true that means we've
					# successfully matched a URI, set params and break
					if ($isValid) {
						self::$controller = $controller;
						$i = 0;

						# Go through each "dir" in the route
						# (I.E. foreach /archives/:year/:month/)
						foreach ($matched as $m) {
							# If it's a variable dir (like :year)
							if(':' == substr($m, 0, 1)) {
								# Remove colon
								$m = substr($m, 1);

								# Remove potential regexp
								$m = preg_replace('/\(.*?\)/', '', $m);

								# Store the same dir in the requested uri
								# (I.E. if we're on :year and the request is /archives/2009/12/
								# we'd store '2009' here
								$val = $requested[$i];

								# Remove potential file-extension from both route AND request
								if(strstr($m, '.')) {
									$tmpExt	= end(explode('.', $m));
									$m		= substr($m, 0, -(strlen($tmpExt) + 1));

									$tmpExt = end(explode('.', $requested[$i]));
									$val	= substr($val, 0, -(strlen($tmpExt) + 1));
								}

								# Set param :year => 2009
								$params[$m] = $val;
							}

							# Increase so that we check next request-dir next time
							$i++;
						}

						break;
					}
				}
			}

			# We couldn't find a valid route
			if (!$isValid) {
				self::$controller = false;
			}

			# Set params, either still empty array or full of goodies
			self::$params = $params;
		}
	}
?>
