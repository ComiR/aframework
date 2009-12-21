<?php
	define('DOCROOT', str_replace('//', '/', realpath(dirname( __FILE__ ) . '/../..') . '/'));
	define('WEBROOT', str_replace('//', '/', '/' . substr(DOCROOT, strlen($_SERVER['DOCUMENT_ROOT']))));

	require_once DOCROOT . 'aFramework/Core/Config.php';
	require_once 'AframeworkInstallModule.php';

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

	extract(AframeworkInstallModule::run());

	ini_set('display_errors', false);
?>
<div id="aframework-install">

	<h2>Installation Wizard</h2>

	<?php if ($installed) { ?>
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
										<input type="checkbox" name="site_hierarchy[]" value="<?php echo $s['name']; ?>"<?php if (isset($selected_sites) and in_array($s['name'], $selected_sites)) { ?> checked="checked"<?php } ?> /> 
										<?php echo $s['title']; ?>
									</label> 
								</li>
							<?php } } ?>
						</ul>

						<input type="hidden" name="site_hierarchy[]" value="aDynAdmin" />
						<input type="hidden" name="site_hierarchy[]" value="aFramework" />

					</fieldset>
				</li>
				<?php foreach ($configs as $config) { ?>
					<li>
						<fieldset>

							<legend><?php echo $config['info']['title']; ?> Settings</legend>

							<p><?php echo $config['info']['description']; ?></p>

							<?php foreach ($config['items'] as $item) {?>
								<p>
									<label>
										<?php echo $item['title']; ?><br />
										<input type="text" name="config[<?php echo $item['key']; ?>]"<?php echo $item['description'] != '' ? ' title="E.g. ' . $item['description'] . '"' : ''; ?> />
									</label>
								</p>
							<?php } ?>

						</fieldset>
					</li>
				<?php } ?>
				<?php if ($selected_sites) { ?>
					<li>
						<fieldset>

							<legend>Styles</legend>

							<p>Select the style(s) you want your site to have. If you want to enable user style switching select more than one style, if not select only one style.<br />Please note that styles may not necessarily be created for more than one particular site and may not suite all your selected sites.</p>

							<dl>
								<?php $i = 0; foreach ($sites as $s) { if (in_array($s['name'], $selected_sites) and count($s['styles'])) { $i++; ?>
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
<?php ini_set('display_errors', true); ?>
