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
			'aBugTracker', 
			'aForum', 
			'AgnesEkman', 
			'OurFutureEU', 
			'phpmyadmin', 
			'aModPack', 
			'aTestSite'
		);

		/**
		 * run
		 *
		 * Runs everything and returns template variables
		 **/
		public static function run () {
			$tplVars = array();

			$tplVars['sites'] = self::getAllSitesAndTheirStyles();

			# If user has selected his site_hiearchy
			if (isset($_POST['site_hierarchy'])) {
				$tplVars['selected_sites']	= $_POST['site_hierarchy'];
				$tplVars['configs']			= self::getSelectedSitesConfig($_POST['site_hierarchy']);
				$tplVars['submit']			= true;
			}

			# Create site
			if (isset($_POST['aframework_install_submit']) and $_POST['aframework_install_submit'] == 1) {
				self::installSite();

				$tplVars['installed'] = true;
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
			$sitesReversed	= array_reverse($selectedSites);

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
									'thumb_url'	=> WEBROOT . $f . '/Styles/' . $sF . '/thumb.png', 
									'img_url'	=> WEBROOT . $f . '/Styles/' . $sF . '/thumb.png'
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
				echo 'ERROR: Site already exists or can\'t exist';

				return false;
			}

			# 1. Create Site directory
			mkdir(DOCROOT . $siteName);

			# 2. Create Controller-files based on selected parent-sites
			mkdir(DOCROOT . $siteName . '/Controllers');

			foreach ($siteHierarchy as $site) {
				$path = DOCROOT . $site . '/Controllers/';

				if (is_dir($path)) {
					$dh = opendir($path);

					while ($f = readdir($dh)) {
						if ('xml' == end(explode('.', $f))) {
							file_put_contents(DOCROOT . $siteName . '/Controllers/' . $f, file_get_contents($path . $f));
						}
					}
				}
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

					$configFile .= "\n\t# {$item['title']}\n\tConfig::set('{$item['name']}', '" . addslashes($value) . "');\n";
				}
			}

			file_put_contents(DOCROOT . $siteName . '/Config.php', $configFile . '?>');

			include DOCROOT . $siteName . '/Config.php';

			# 4. Create Styles directories based on selected styles
			mkdir(DOCROOT . $siteName . '/Styles');

			foreach ($_POST['styles'] as $style) {
				mkdir(DOCROOT . $siteName . '/Styles/' . $style);
			}

			# 5. Create database
			mysql_connect(Config::get('db.host'), Config::get('db.user'), Config::get('db.pass'));
			
			if (mysql_select_db(Config::get('db.name'))) {
				echo 'Error: Database already exists - will not modify';
			}
			else {
				mysql_query('CREATE DATABASE ' . Config::get('db.name') . ' CHARACTER SET utf8 COLLATE utf8_general_ci');

				if (!mysql_select_db(Config::get('db.name'))) {
					echo 'Error: Unable to create database - please insert sql-files manually';
				}
				else {
					# 6. Install all SQL-files, prefix "translated_tables"
					$path	= DOCROOT . 'Install/sql/';
					$sql	= '';
					$dh		= opendir($path);

					while ($f = readdir($dh)) {
						if ('sql' == end(explode('.', $f))) {
							$sqlLines		= file($path . $f);
							$realSQLLines	= array();

							foreach ($sqlLines as $line) {
								$firstTwo = substr($line, 0, 2);

								if ($firstTwo != '--' and $firstTwo != '/*') {
									$realSQLLines[] = trim($line);
								}
							}

							$sql .= implode("\n", $realSQLLines);
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

			file_put_contents(DOCROOT . 'index.php', $newIndexCode);
		}
	}
?>
