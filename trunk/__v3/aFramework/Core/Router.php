<?php
	/**
	 * Router
	 *
	 * Analyses the URI and sets appropriate GET-vars based on the current sites Routes.php-file
	 **/
	final class Router {
		private static $routes = false;

		/**
		 * run
		 * 
		 * Loads all the routes and merges the params with GET-array
		 **/
		public static function run (  ) {
			$sites = explode(' ', SITE_HIERARCHY);

			# Load all routes
			foreach ( $sites as $site ) {
				$routesFile = DOCROOT . $site . '/Routes.php';

				if ( file_exists($routesFile) ) {
					self::$routes = array_merge((array)self::$routes, include $routesFile);
				}
			}

			self::$routes = array_filter(self::$routes);

			self::sortRoutes();

			# Merge params with GET-vars
			$_GET = array_merge($_GET, self::getParamsFromURI()); # Could switch places so ?controller= overrides /controller/ but that allows URL-trickery that can be potentially bad for SEO
		}

		private static function sortRoutes (  ) {
			$hardCoded	= array();
			$variable	= array();

			foreach ( self::$routes as $uri => $controller ) {
				if ( false === strpos($uri, ':') ) {
					$hardCoded[$uri] = $controller;
				}
				else {
					$variable[$controller] = $uri;
				}
			}

			uasort($variable, array('self', 'routeSortingCallback'));

			self::$routes = array_merge($hardCoded, array_flip($variable));
		}

		private static function routeSortingCallback ( $a, $b ) {
			$aLen = strlen($a);
			$bLen = strlen($b);

			if ( $aLen == $bLen ) {
				return 0;
			}
			elseif ( $aLen > $bLen ) {
				return 1;
			}
			else {
				return -1;
			}
		}

		public static function getRoutes (  ) {
			return self::$routes;
		}

		public static function urlize ( $str ) {
			return strtolower(preg_replace('/[^A-Za-z0-9_-]/', '', $str));
		}

		/**
		 * urlForModule
		 * 
		 **/
		public static function urlForModule ( $mod ) {
			return WEBROOT . '?module=' . $mod;
		}

		/**
		 * urlForFile
		 * 
		 **/
		public static function urlForFile ( $path, $site = false ) {
			$site = $site ? $site : CURRENT_SITE;

			return str_replace('//', '/', WEBROOT . $site . '/Files/' . $path);
		}

		/**
		 * urlFor
		 * 
		 * Uses the $routes and $attrs passed by user to construct
		 * a proper URL for a particular controller
		 * <a href="<?=Router::urlFor('Article', $article);?>"><?=$article['title'];? ></a>
		 **/
		public static function urlFor ( $requestedController, $attrs = array() ) {
			$url = false;

			foreach ( self::$routes as $match => $controller ) {
				if ( $controller == $requestedController ) {
					# Remove variable-definitions and possible regexps
					$url = str_replace(':', '', $match);
					$url = preg_replace('/\(.*?\)/', '', $url);

					# May be dangerous to just str_replace here (/:cat_url_str/:url_str.htm will fuck up for example... may have to check each directory individually)
					foreach ( $attrs as $k => $v ) {
						$url = str_replace($k, $v, $url);
					}

					break;
				}
			}

			$webroot = USE_MOD_REWRITE ? WEBROOT : ($requestedController == 'Home' ? WEBROOT : WEBROOT . 'index.php/');

			return $url ? str_replace('//', '/', $webroot . $url) : '#';
		}

		/**
		 * getParamsFromURI
		 * 
		 * Analyses the URI and tries to match it to a route stored in $routes
		 * If a match is found returns array with controller and attrs set, else returns 404-controller
		 **/
		private static function getParamsFromURI (  ) {
			$requested		= isset($_SERVER['PATH_INFO']) ? explode('/', $_SERVER['PATH_INFO']) : explode('/', '/');
			$countRequested	= count($requested);
			$params			= array();
			$isValid		= false;

			foreach ( self::$routes as $match => $controller ) {
				$matched	= explode('/', $match);

				# The requested URI has the same amount of dirs as the route
				if ( count($matched) == $countRequested ) {
					$isValid = true;

					# Make sure the directories match
					for ( $i = 0; $i < $countRequested; $i++ ) {
						# See if this route-dir contains a file-extension (first remove any regexp)
						$tmp = preg_replace('/\(.*?\)/', '', $matched[$i]);

						if ( strstr($tmp, '.') ) {
							if ( end(explode('.', $tmp)) != end(explode('.', $requested[$i])) ) {
								$isValid = false;
								break;
							}
						}
						# See if this route-dir is a variable
						if ( ':' == substr($matched[$i], 0, 1) ) {
							# See if this var contains a reg-exp-match
							if ( strstr($matched[$i], '(') ) {
								$regExp = explode('(', $matched[$i]);
								$regExp = substr($regExp[1], 0, -1);

								if ( !preg_match("/^$regExp$/", $requested[$i]) ) {
									$isValid = false;
									break;
								}
							}
							# Else - anything is valid
						}
						# It's a hard-coded value
						elseif ( $matched[$i] != $requested[$i] ) {
							$isValid = false;
							break;
						}
					}
					# If isValid is still true that means we've successfully matched a URI, set params and break
					if ( $isValid ) {
						$params['controller'] = $controller;
						$i = 0;

						# Set all the params in the route
						foreach ( $matched as $m ) {
							if(':' == substr($m, 0, 1)) {
								# Remove colon
								$m = substr($m, 1);

								# Remove regexp
								$m = preg_replace('/\(.*?\)/', '', $m);

								# Remove file-extension
								if ( strstr($m, '.') ) {
									$m = explode('.', $m);
									$m = $m[0];
								}

								# Set params
								$tmp = explode('.', $requested[$i]);
								$params[$m] = $tmp[0];
							}

							$i++;
						}

						break;
					}
				}
			}

			# We couldn't find a valid route
			if ( !$isValid ) {
				$params['controller'] = false;
			}

			return $params;
		}
	}
?>