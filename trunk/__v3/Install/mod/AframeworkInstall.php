<?php
	function escHTML ($str) {
		return str_replace(
					array(
						'&amp;', 
						'&', 
						'<', 
						'>', 
						'"', 
						"'"
					), 
					array(
						'&', 
						'&amp;', 
						'&lt;', 
						'&gt;', 
						'&quot;', 
						'&apos;'
					), 
					$str
				);
	}

	$docRoot = str_replace('//', '/', realpath(dirname( __FILE__ ) . '/../..') . '/');
	$webRoot = str_replace('//', '/', '/' . substr($docRoot, strlen($_SERVER['DOCUMENT_ROOT'])));

	# Store all available sites, their styles and their config in array
	$notSites	= array(
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
	$sites	= array();
	$dh		= opendir($docRoot);

	while ($f = readdir($dh)) {
		if (!in_array($f, $notSites) and is_dir($docRoot . $f) and '__' != substr($f, 0, 2)) {
			$sDir	= $docRoot . $f . '/Styles/';
			$styles	= array();

			if (is_dir($sDir)) {
				$sDH = opendir($sDir);

				# Grab this site's styles
				while ($sF = readdir($sDH)) {
					if (!in_array($sF, $notSites) and is_dir($sDir . $sF) and '__' != substr($sF, 0, 2) and file_exists($sDir . $sF . '/style.css')) {
						$styles[] = array(
							'name'		=> $sF, 
							'title'		=> escHTML($sF), 
							'thumb_url'	=> $webRoot . $f . '/Styles/' . $sF . '/thumb.png', 
							'img_url'	=> $webRoot . $f . '/Styles/' . $sF . '/thumb.png'
						);
					}
				}
			}

			$sites[] = array(
				'name'		=> $f, 
				'title'		=> escHTML($f), 
				'styles'	=> $styles, 
				'thumb_url'	=> $webRoot . $f . '/thumb.png', 
				'img_url'	=> $webRoot . $f . '/thumb.png'
			);
		}
	}

	# If user has selected his site_hiearchy
	if (isset($_POST['site_hierarchy'])) {
		# Store all selected sites
		$site_hierarchy_sites = array();
		$tmp = array_unique(array_filter($_POST['site_hierarchy']));

		foreach ($tmp as $v) {
			$site_hierarchy_sites[] = $v;
		}

		# Store all selected site's config
		require_once $docRoot . 'aFramework/Core/Config.php';

		foreach ($site_hierarchy_sites as $s) {
			$path = $docRoot . $s . '/Config.php';

			if (file_exists($path)) {
				require_once $path;
			}
		}

		$site_hierarchy_config = Config::asArray();

		$submit = true;
	}

	# Create site
	if (isset($_POST['aframework_install_submit']) and $_POST['aframework_install_submit'] == 1) {
		$siteName = preg_replace('/[^A-Za-z0-9_-]/', '', $_POST['site_name']);
		$siteHierarchy = array_filter($_POST['site_hierarchy']);

		if (empty($siteName) or is_dir($docRoot . $siteName)) {
			die('SITE ALREADY EXISTS OR CANT EXIST');
		}

		if (is_writeable()) {
			
		}

		# 1. Create Site directory
		mkdir($docRoot . $siteName);

		# 2. Create Controller-files based on selected parent-sites
		mkdir($docRoot . $siteName . '/Controllers');

		foreach ($siteHierarchy as $site) {
			$path = $docRoot . $site . '/Controllers/';

			if (is_dir($path)) {
				$dh = opendir($path);

				while ($f = readdir($dh)) {
					if ('xml' == end(explode('.', $f))) {
						file_put_contents($docRoot . $siteName . '/Controllers/' . $f, file_get_contents($path . $f));
					}
				}
			}
		}

		# 3. Create Config-files based on selected config
		$configFile = "<?php\n";

		foreach ($_POST['config'] as $k => $v) {
			if (!empty($v)) {
				$configFile .= "\tConfig::set('$k', '$v');\n";
			}
		}

		file_put_contents($docRoot . $siteName . '/Config.php', $configFile . '?>');

		# 4. Create Styles directories based on selected styles
		mkdir($docRoot . $siteName . '/Styles');

		foreach ($_POST['styles'] as $style) {
			mkdir($docRoot . $siteName . '/Styles/' . $style);
		}

		# 5. Install SQL-files for all selected sites
		$sql = '';

		foreach ($siteHierarchy as $site) {
			$path = $docRoot . $site . '/DBLib/';

			if (is_dir($path)) {
				$dh = opendir($path);

				while ($f = readdir($dh)) {
					if ('sql' == end(explode('. ', $f))) {
						$sql .= file_get_contents($path . $f);
					}
				}
			}
		}

		# 5. Modify index.php's SITE_HIERARCHY-definition to reflect user's new site
		$indexCode			= file_get_contents($docRoot . 'index.php');
		$siteHierarchyStr	= implode(' ', array_merge(array($siteName), $siteHierarchy));
		$newIndexCode		= preg_replace('/default :.*?define\(\'SITE_HIERARCHY\'.*?\)/s', "default : \n\t\t\tdefine('SITE_HIERARCHY', '$siteHierarchyStr')", $indexCode);

	#	file_put_contents($docRoot . 'index.php', $newIndexCode);

		$installed = true;
	}
?>
<div id="aframework-install">

	<h2>Installation Wizard</h2>

	<?php if (isset($installed)) { ?>
		<h3>Nice one</h3>

		<p>Your site was successfully installed. <a href="../">View your site</a> and start creating.</p>
	<?php } else { ?>
		<form method="post" action="">

			<ol>
				<li>
					<fieldset>

						<legend>First thing's first</legend>

						<p>Let's start off simple, please provide a short name without spaces for your site. This name will be used for your site's directory, you can name your site whatever you want later on.</p>

						<p>
							<label>
								Site name<br />
								<input type="text" name="site_name" title="E.g. MyAwesomeSite" value="<?php echo @$_POST['site_name']; ?>" />
							</label>
						</p>

					</fieldset>
				</li>
				<li>
					<fieldset>

						<legend>Site features</legend>

						<p>Your site may inherit features from any number of other aFramework-sites, please select which sites you wish your site to inherit features from. If you want to create a site completely from scratch don't select anything.</p>

						<ul>
							<?php foreach ($sites as $s) { if ($s['name'] != 'aFramework') { ?>
								<li>
									<label>
										<img src="<?php echo $s['thumb_url']; ?>" alt="" /><br />
										<input type="checkbox" name="site_hierarchy[]" value="<?php echo $s['name']; ?>"<?php if (isset($site_hierarchy_sites) and in_array($s['name'], $site_hierarchy_sites)) { ?> checked="checked"<?php } ?> /> 
										<?php echo $s['title']; ?>
									</label> 
								</li>
							<?php } } ?>
						</ul>

						<input type="hidden" name="site_hierarchy[]" value="aDynAdmin" />
						<input type="hidden" name="site_hierarchy[]" value="aFramework" />

					</fieldset>
				</li>
				<?php if (isset($site_hierarchy_config)) { foreach ($site_hierarchy_config as $config) { ?>
					<li>
						<fieldset>

							<legend><?php echo $config['info']['title']; ?> Settings</legend>

							<p><?php echo $config['info']['description']; ?></p>

							<?php foreach ($config['items'] as $item) { if ('aframework.default_style' != $item['key'] and 'aframework.allow_styles' != $item['key']) { ?>
								<p>
									<label>
										<?php echo $item['title']; ?><br />
										<input type="text" name="config[<?php echo $item['key']; ?>]"<?php echo $item['description'] != '' ? ' title="E.g. ' . $item['description'] . '"' : ''; ?> />
									</label>
								</p>
							<?php } } ?>

						</fieldset>
					</li>
				<?php } } ?>
				<?php if (isset($site_hierarchy_sites)) { ?>
					<li>
						<fieldset>

							<legend>Styles</legend>

							<p>Select the style(s) you want your site to have. If you want to enable user style switching select more than one style, if not select only one style.<br />Please note that styles may not necessarily be created for more than one particular site and may not suite all your selected sites.</p>

							<dl>
								<?php $i = 0; foreach ($sites as $s) { if (in_array($s['name'], $site_hierarchy_sites) and count($s['styles'])) { $i++; ?>
									<dt><?php echo $s['title']; ?></dt>
									<dd>
										<ul>
											<?php foreach ($s['styles'] as $st) { ?>
												<li>
													<a href="<?php echo $st['img_url']; ?>">
														<img src="<?php echo $st['thumb_url']; ?>" alt="" />
													</a><br />
													<label>
														<input type="checkbox" name="styles[]" value="<?php echo $st['name']; ?>" checked="checked" /> 
														<?php echo $st['title']; ?>
													</label><br />
													<label>
														<input type="radio" name="default_style"<?php if ($i == 1) { ?> checked="checked"<?php } ?> /> Make default
													</label>
												</li>
											<?php } ?>
										</ul>
									</dd>
								<?php } } ?>
							</dl>

						</fieldset>
					</li>
				<?php } ?>
			</ol>

			<p>
				<?php if (isset($submit)) { ?>
					<input type="hidden" name="aframework_install_submit" value="1" />
					<input type="submit" value="Create my site" />
				<?php } else { ?>
					<input type="submit" value="Next step &raquo;" />
				<?php } ?>
			</p>

		</form>
	<?php } ?>

</div>
