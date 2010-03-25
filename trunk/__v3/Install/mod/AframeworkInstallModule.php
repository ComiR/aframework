<?php
	class aFrameworkInstallModule {
		private static $notSites = array(
			'.', 
			'..', 
			'.svn', 
			'Install', 
			'aSimplePortfolio', 
			'aDynAdmin', 
			'AndreasLagerkvist', 
			'aFrameworkCom', 
			'aForum', 
			'AgnesEkman', 
			'OurFutureEU', 
			'phpmyadmin', 
			'aModPack', 
			'aTestSite'
		);
		private static $errors = array();

		/**
		 * run
		 *
		 * Runs everything and returns template variables
		 **/
		public static function run () {
			$tplVars = array(
				'sites'	=> self::getAllSitesAndTheirStyles()
			);

			# If user has selected his site_hiearchy
			if (isset($_POST['site_hierarchy'])) {
				$tplVars['selected_sites']	= $_POST['site_hierarchy'];
				$tplVars['configs']			= self::getSelectedSitesConfig($_POST['site_hierarchy']);
				$tplVars['submit']			= true;
			}

			# Create site
			if (isset($_POST['aframework_install_submit']) and $_POST['aframework_install_submit'] == 1) {
				self::installSite();

				$tplVars['errors']		= count(self::$errors) ? self::$errors : false;
				$tplVars['installed']	= true;
			}

			return $tplVars;
		}

		/**
		 * getSelectedSitesConfig
		 *
		 * Returns $sites' config-files
		 **/
		private static function getSelectedSitesConfig ($sites) {
			$selectedSites	= array_unique(array_filter($sites));
		#	$sitesReversed	= array_reverse($selectedSites);

			foreach ($selectedSites as $site) {
				$path = DOCROOT . $site . '/Config.php';

				if (file_exists($path)) {
					include $path;
				}
			}

			return Config::asArray();
		}

		/**
		 * getAllSitesAndTheirStyles
		 *
		 * Returns all available sites and their styles
		 **/
		private static function getAllSitesAndTheirStyles () {
			$sites	= array();
			$dh		= opendir(DOCROOT);

			while ($f = readdir($dh)) {
				if (!in_array($f, self::$notSites) and is_dir(DOCROOT . $f) and '__' != substr($f, 0, 2)) {
					$sDir	= DOCROOT . $f . '/Styles/';
					$styles	= array();

					if (is_dir($sDir)) {
						$sDH = opendir($sDir);

						# Grab this site's styles
						while ($sF = readdir($sDH)) {
							if (!in_array($sF, self::$notSites) and is_dir($sDir . $sF) and '__' != substr($sF, 0, 2) and file_exists($sDir . $sF . '/style.css')) {
								$styles[] = array(
									'name'		=> $sF, 
									'title'		=> escHTML($sF), 
									'thumb_url'	=> WEBROOT . 'aFramework/Lib/phpThumb/phpThumb.php?src=' . DOCROOT . $thumbPath . '&amp;w=320', 
									'img_url'	=> WEBROOT . $thumbPath
								);
							}
						}
					}

					$sites[] = array(
						'name'		=> $f, 
						'title'		=> escHTML($f), 
						'styles'	=> $styles, 
						'thumb_url'	=> WEBROOT . $f . '/thumb.png', 
						'img_url'	=> WEBROOT . $f . '/thumb.png'
					);
				}
			}

			return $sites;
		}

		/**
		 * installSite
		 *
		 * Installs the site
		 **/
		private static function installSite () {
			$siteName		= preg_replace('/[^A-Za-z0-9_-]/', '', $_POST['site_name']);
			$siteHierarchy	= array_filter($_POST['site_hierarchy']);

			if (empty($siteName) or is_dir(DOCROOT . $siteName)) {
				self::$errors[] = "The site '$siteName' already exists or is invalid";

				return false;
			}

			# 1. Create Site directory
			if (!mkdir(DOCROOT . $siteName)) {
				self::$errors[] = 'Could not create directory - perhaps permissions? Try $ chomd -r 777 aFrameworkROOT/';
			}

			# 2. Create Controller-files based on selected parent-sites
			mkdir(DOCROOT . $siteName . '/Controllers');

			$notModules			= array('#text', '#comment', '#cdata-section');
			$baseModules		= array();
			$controllers		= array();
			$secondaryModules	= array();
			$tertiaryModules	= array();

			# Go through all the sites and create merged controllers based on
			# all controller's primary, secondary and tertiary content
			foreach ($siteHierarchy as $site) {
				# Ignore dynadmin...
				if ($site != 'aDynAdmin') {
					$path = DOCROOT . $site . '/Controllers/';

					if (is_dir($path)) {
						$dh = opendir($path);

						while ($f = readdir($dh)) {
							if ('xml' == end(explode('.', $f))) {
								$doc = new DOMDocument();
								$doc->load($path . $f);

								# Store all the wrappers in this controller
								$allWrappers = $doc->getElementsByTagName('Wrapper');

								foreach ($allWrappers as $wrapper) {
									$wrapperName = $wrapper->getAttribute('name');

									# Save all the base modules
									$headOrFoot = 'head';

									if ($wrapperName == 'wrapper') {
										foreach ($wrapper->childNodes as $baseMod) {
											if (!in_array($baseMod->nodeName, array_merge($notModules, array('Wrapper')))) {
												$baseModules[$headOrFoot][] = $baseMod->nodeName;
											}
											elseif ($baseMod->nodeName == 'Wrapper') {
												$headOrFoot = 'foot';
											}
										}
									}
									# Save all the primary content modules in $controllers['ControllerName'][]
									elseif ($wrapperName == 'primary-content') {
										foreach ($wrapper->childNodes as $primConMod) {
											if (!in_array($primConMod->nodeName, $notModules)) {
												$controllers[$f][] = $primConMod->nodeName;
											}
										}
									}
									# Save all the secondary and tertiary content modules
									elseif ($wrapperName == 'secondary-content') {
										foreach ($wrapper->childNodes as $seconConMod) {
											if (!in_array($seconConMod->nodeName, $notModules)) {
												$secondaryModules[] = $seconConMod->nodeName;
											}
										}
									}
									elseif ($wrapperName == 'tertiary-content') {
										foreach ($wrapper->childNodes as $terConMod) {
											if (!in_array($terConMod->nodeName, $notModules)) {
												$tertiaryModules[] = $terConMod->nodeName;
											}
										}
									}
								}
							}
						}
					}
				}
			}

			$headModules		= array_unique($baseModules['head']);
			$footModules		= array_unique($baseModules['foot']);
			$secondaryModules	= array_unique($secondaryModules);
			$tertiaryModules	= array_unique($tertiaryModules);

			# Now that we have all the controller's that should be created
			# as well as all the merged head, foot, and wrapper modules we can create the actual files
			foreach ($controllers as $controller => $controllerModules) {
				$path				= DOCROOT . $siteName . '/Controllers/' . $controller;
				$doc				= new DOMDocument('1.0');
				$doc->formatOutput	= true;
				$base				= $doc->appendChild($doc->createElement('Base'));
				$wrapperWrapper		= $base->appendChild($doc->createElement('Wrapper'));

				$wrapperWrapper->setAttribute('name', 'wrapper');

				# Append head modules
				foreach ($headModules as $module) {
					$wrapperWrapper->appendChild($doc->createElement($module));
				}

				# Create new wrappers
				$newWrappers = array();

				foreach (array('primary-content', 'secondary-content', 'tertiary-content') as $wrapper) {
					$newWrappers[$wrapper] = $wrapperWrapper->appendChild($doc->createElement('Wrapper'));

					$newWrappers[$wrapper]->setAttribute('name', $wrapper);
				}

				# Append primary content modules
				foreach ($controllerModules as $module) {
					$newWrappers['primary-content']->appendChild($doc->createElement($module));
				}

				# Append secondary content modules
				foreach ($secondaryModules as $module) {
					$newWrappers['secondary-content']->appendChild($doc->createElement($module));
				}

				# Append tertiary content modules
				foreach ($tertiaryModules as $module) {
					$newWrappers['tertiary-content']->appendChild($doc->createElement($module));
				}

				# Append footer modules
				foreach ($footModules as $module) {
					$wrapperWrapper->appendChild($doc->createElement($module));
				}

				file_put_contents($path, $doc->saveXML());
			}

			# 3. Create Config-files based on selected config
			Config::clear();

			$shReversed = array_reverse($siteHierarchy);

			foreach ($shReversed as $site) {
				$path = DOCROOT . $site . '/Config.php';

				if (file_exists($path)) {
					include $path;
				}
			}

			$configs	= Config::asArray();
			$configFile	= "<?php";

			foreach ($configs as $config) {
				$configFile .= "\n\t##################################################\n\t# {$config['info']['title']}\n\t# {$config['info']['description']}\n\t##################################################\n";

				foreach ($config['items'] as $item) {
					$value = (isset($_POST['config'][$item['name']]) and !empty($_POST['config'][$item['name']])) ? $_POST['config'][$item['name']] : $item['value'];
					$value = is_bool($value) ? ($value === true ? 'true' : 'false') : "'" . addslashes($value) . "'";

					$configFile .= "\n\t# {$item['title']}\n\tConfig::set('{$item['name']}', " . $value . ");\n";
				}
			}

			file_put_contents(DOCROOT . $siteName . '/Config.php', $configFile . '?>');

			include DOCROOT . $siteName . '/Config.php';

			# 4. Create Styles directories based on selected styles
			mkdir(DOCROOT . $siteName . '/Styles');

			$styles		= $_POST['styles'];
			$styles[]	= $_POST['config']['general.default_style'];
			$styles		= array_unique($styles);

			foreach ($_POST['styles'] as $style) {
				mkdir(DOCROOT . $siteName . '/Styles/' . $style);
			}

			# 5. Create database
			mysql_connect(Config::get('db.host'), Config::get('db.user'), Config::get('db.pass'));

			if (mysql_select_db(Config::get('db.name'))) {
				self::$errors[] = 'The database ' . Config::get('db.name') . ' already exists - please insert sql-files (from /Install/sql/) manually';
			}
			else {
				mysql_query('CREATE DATABASE ' . Config::get('db.name') . ' CHARACTER SET utf8 COLLATE utf8_general_ci');

				if (!mysql_select_db(Config::get('db.name'))) {
					self::$errors[] = 'Unable to create database - please insert sql-files manually';
				}
				else {
					# 6. Install all SQL-files, prefix "translated_tables"
					$path				= DOCROOT . 'Install/sql/';
					$sql				= '';
					$dh					= opendir($path);
					$translatedTables	= explode(',', Config::get('lang.translated_tables'));
					$allowedLangs		= explode(',', Config::get('lang.allowed_langs'));
					$defaultLang		= Config::get('lang.default_lang');
					$numAllowedLangs	= count($allowedLangs);

					while ($f = readdir($dh)) {
						$ext			= end(explode('.', $f));
						$dbTableName	= substr($f, 0, -4);

						if ('sql' == $ext) {
							$sqlLines		= file($path . $f);
							$realSQLLines	= array();

							foreach ($sqlLines as $line) {
								$firstTwo = substr($line, 0, 2);

								if ($firstTwo != '--' and $firstTwo != '/*') {
									$realSQLLines[] = trim($line);
								}
							}

							$thisTablesSQL = implode("\n", $realSQLLines);
							$langSQL = '';

							# If this table should be translated, duplicate this table's SQL 
							# for each language, prefixing every table with the language-code
							if ($numAllowedLangs > 1 and in_array($dbTableName, $translatedTables)) {
								require_once DOCROOT . 'aFramework/Core/DB.php';

								foreach ($allowedLangs as $allowedLang) {
									$langSQL .= DB::prefixDBTableNames($thisTablesSQL, $allowedLang . '_', array($dbTableName));
								}

								$thisTablesSQL = $langSQL;
							}

							$sql .= $thisTablesSQL;
						}
					}

					$sql = array_filter(explode(";\n", $sql), 'trim');

					foreach ($sql as $statement) {
						mysql_query($statement);
					}
				}
			}

			# 7. Modify index.php's SITE_HIERARCHY-definition to reflect user's new site
			$indexCode			= file_get_contents(DOCROOT . 'index.php');
			$siteHierarchyStr	= implode(' ', array_merge(array($siteName), $siteHierarchy));
			$newIndexCode		= preg_replace('/default :.*?define\(\'SITE_HIERARCHY\'.*?\)/s', "default : \n\t\t\tdefine('SITE_HIERARCHY', '$siteHierarchyStr')", $indexCode);

			unlink(DOCROOT . 'index.php');
			file_put_contents(DOCROOT . 'index.php', $newIndexCode);

			# 8. Modify .htaccess' RewriteBase-definition to reflect users WEBROOT
			$htaccessCode		= file_get_contents(DOCROOT . '.htaccess');
			$newHtaccessCode	= preg_replace('/RewriteBase \//', 'RewriteBase ' . WEBROOT, $htaccessCode);

			unlink(DOCROOT . '.htaccess');
			file_put_contents(DOCROOT . '.htaccess', $newHtaccessCode);
		}
	}
?>
