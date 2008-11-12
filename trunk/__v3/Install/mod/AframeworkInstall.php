<?php
	$docRoot = realpath(dirname( __FILE__ ) .'/../..') .'/';
	$webRoot = '/' .substr($docRoot, strlen($_SERVER['DOCUMENT_ROOT']));

	# Store all available sites, their styles and their config in array
	$notSites	= array(
		'.', 
		'..', 
		'.svn', 
		'Install', 
		'aJqueryPluginSite', 
		'aDynAdmin', 
		'AndreasLagerkvist'
	);
	$sites	= array();
	$dh		= opendir($docRoot);

	while($f = readdir($dh)) {
		if(!in_array($f, $notSites) and is_dir($docRoot .$f) and '__' != substr($f, 0, 2)) {
			$sDir	= $docRoot .$f .'/Styles/';
			$styles	= array();
			$sDH	= @opendir($sDir);

			while($sF = @readdir($sDH)) {
				if(!in_array($sF, $notSites) and is_dir($sDir .$sF) and '__' != substr($sF, 0, 2) and file_exists($sDir .$sF .'/style.css')) {
					$styles[] = array(
						'name'		=> $sF, 
						'title'		=> htmlentities($sF), 
						'thumb_url'	=> $webRoot .$f .'/Styles/' .$sF .'/thumb.png', 
						'img_url'	=> $webRoot .$f .'/Styles/' .$sF .'/thumb.png'
					);
				}
			}

			$sites[] = array(
				'name'		=> $f, 
				'title'		=> htmlentities($f), 
				'styles'	=> $styles, 
				'thumb_url'	=> $webRoot .$f .'/thumb.png', 
				'img_url'	=> $webRoot .$f .'/thumb.png'
			);
		}
	}

	# If user has selected his site_hiearchy
	if(isset($_POST['site_hierarchy'])) {
		# Store all selected sites
		$site_hierarchy_sites = array();
		$tmp = array_unique(array_filter($_POST['site_hierarchy']));
		foreach($tmp as $v) {
			$site_hierarchy_sites[] = $v;
		}

		# Store all selected site's config
		require_once $docRoot .'aFramework/Core/Config.php';

		foreach($site_hierarchy_sites as $s) {
			$path = $docRoot .$s .'/Config.php';

			if(file_exists($path)) {
				require_once $path;
			}
		}

		$site_hierarchy_config = Config::asArray();

		$submit = true;
	}

	# Create site
	if(isset($_POST['aframework_install_submit']) and $_POST['aframework_install_submit'] == 1) {
	/*	$siteName = preg_replace('/[^A-Za-z0-9_-]/', '', $_POST['site_name']);
		$siteHierarchy = array_filter($_POST['site_hierarchy']);

		if(empty($siteName) or is_dir($docRoot .$siteName)) {
			die('SITE ALREADY EXISTS OR CANT EXIST');
		}

		# 1. Create Site directory
		mkdir($docRoot .$siteName, 0777);

		# 2. Create Controller-files based on selected parent-sites
		mkdir($docRoot .$siteName .'/Controllers', 0777);

		foreach($siteHierarchy as $site) {
			$path = $docRoot .$site .'/Controllers/';

			if(is_dir($path)) {
				$dh = opendir($path);

				while($f = readdir($dh)) {
					if('xml' == end(explode('.', $f))) {
						file_put_contents($docRoot .$siteName .'/Controllers/' .$f, file_get_contents($path .$f));
					}
				}
			}
		}

		# 3. Create Config-files based on selected config
		$configFile = "<?php\n";

		foreach($_POST['config'] as $k => $v) {
			$configFile .= "Config::set('$k', '$v');\n";
		}

		file_put_contents($docRoot .$siteName .'/Config.php', $configFile .'?>');

		# 4. Create Styles directories based on selected styles
		mkdir($docRoot .$siteName .'/Styles', 0777);

		foreach($_POST['styles'] as $style) {
			mkdir($docRoot .$siteName .'/Styles/' .$style);
		}

		# 5. Modify index.php's SITE_HIERARCHY-definition to reflect user's new site
		file_put_contents(
			$docRoot .'index.php', 
			preg_replace(
				'define\(\'SITE_HIERARCHY\'.*?\)', 
				'define\(\'SITE_HIERARCHY\', ' .implode(' ', 
					array_merge(
						array($siteName), 
						array_filter($_POST['site_hierarchy'])
					)
				) .'\)', 
				file_get_contents($docRoot .'index.php')
			)
		);
		*/
		$installed = true;
	}
?>
<div id="aframework-install">

	<h2>Installation Wizard</h2>

	<?php if(isset($installed)) { ?>
		<h3>Nice one</h3>

		<p>Your site was successfully installed. <a href="../">View your site</a> and start creating.</p>
	<?php } else { ?>
		<form method="post" action="">

			<fieldset>

				<h3>First thing's first</h3>

				<p>Let's start off simple, please provide a short name without spaces for your site. This name will be used for your site's directory, you can rename your site to whatever you want later on.</p>

				<p>
					<label>
						Site name<br />
						<input type="text" name="site_name" title="E.g. MyAwesomeSite" value="<?php echo @$_POST['site_name']; ?>" />
					</label>
				</p>

			</fieldset>

			<fieldset>

				<h3>Site features</h3>

				<p>Your site may inherit features from any number of other aFramework-sites, please select which sites you wish your site to inherit features from. If you want to create a site completely from scratch don't select anything.</p>

				<ul>
					<?php foreach($sites as $s) { if($s['name'] != 'aFramework') { ?>
						<li>
							<label>
								<img src="<?php echo $s['thumb_url']; ?>" alt="" /><br />
								<input type="checkbox" name="site_hierarchy[]" value="<?php echo $s['name']; ?>"<?php if(isset($site_hierarchy_sites) and in_array($s['name'], $site_hierarchy_sites)) { ?> checked="checked"<?php } ?> /> 
								<?php echo $s['title']; ?>
							</label> 
						</li>
					<?php } } ?>
					<li>
						<label>
							<img src="#" alt="" /><br />
							<input type="checkbox" name="site_hierarchy[]" value="aFramework" checked="checked" disabled="disabled" />
							<input type="hidden" name="site_hierarchy[]" value="aFramework" />
							aFramework
						</label>
					</li>
				</ul>

			</fieldset>

			<?php if(isset($site_hierarchy_config)) { foreach($site_hierarchy_config as $config) { ?>
				<fieldset>

					<h3><?php echo $config['info']['title']; ?> Settings</h3>

					<p><?php echo $config['info']['description']; ?></p>

					<?php foreach($config['items'] as $item) { if('aframework.default_style' != $item['key'] and 'aframework.allow_styles' != $item['key']) { ?>
						<p>
							<label>
								<?php echo $item['title']; ?><br />
								<input type="text" name="config[<?php echo $item['key']; ?>]" title="<?php echo $item['default_value']; ?>" />
							</label>
						</p>
					<?php } } ?>

				</fieldset>
			<?php } } ?>

			<?php if(isset($site_hierarchy_sites)) { ?>
				<fieldset>

					<h3>Styles</h3>

					<p>Select the style(s) you want your site to have. If you want to enable user style switching select more than one style, if not select only one style.<br />Please note that styles may not necessarily be created for more than one particular site and may not suite all your selected sites.</p>

					<dl>
						<?php foreach($sites as $s) { if(in_array($s['name'], $site_hierarchy_sites)) { ?>
							<dt><?php echo $s['title']; ?></dt>
							<dd>
								<?php if(count($s['styles'])) { ?>
									<ul>
										<?php foreach($s['styles'] as $st) { ?>
											<li>
												<a href="<?php echo $st['img_url']; ?>">
													<img src="<?php echo $st['thumb_url']; ?>" alt="" />
												</a><br />
												<label>
													<input type="checkbox" name="styles[]" value="<?php echo $st['name']; ?>" checked="checked" /> 
													<?php echo $st['title']; ?>
												</label> 
													<input type="radio" name="default_style" /> Make default
												</label>
											</li>
										<?php } ?>
									</ul>
								<?php } else { ?>
									No styles
								<?php } ?>
							</dd>
						<?php } } ?>
					</dl>

				</fieldset>
			<?php } ?>

			<p>
				<?php if(isset($submit)) { ?>
					<input type="hidden" name="aframework_install_submit" value="1" />
					<input type="submit" value="Create my site" />
				<?php } else { ?>
					<input type="submit" value="Next step &raquo;" />
				<?php } ?>
			</p>

		</form>
	<?php } ?>

</div>
