<?php
	ini_set('display_errors', false);
	$tplVars = aFramework::$debugInfo;
	$tplVars['routes'] = Router::getRoutes();
	$tplVars['config'] = Config::asArray();
?>
<h2>Debug Information</h2>

<p>
	<a href="<?php echo Router::urlFor('AdminLogin'); ?>?logout">
		Logout
	</a>
</p>

<?php if (count($nav_items)) { ?>
	<ul class="navigation">
		<?php foreach ($nav_items as $item) { ?>
			<li>
				<a href="<?php echo $item['url']; ?>">
					<?php echo escHTML($item['title']); ?>
				</a>
			</li>
		<?php } ?>
	</ul>
<?php } ?>

<ul class="debug">
	<li>
		<h3>Debug</h3>

		<ul>
			<li>
				<h4>Controller</h4>

				<dl>
					<dt>Path</dt>
					<dd><?php echo str_replace(DOCROOT, '', $tplVars['controller']['path']); ?></dd>
					<dt>Run time</dt>
					<dd><?php echo round(Timer::stop(), 2); ?> sec(s)</dd>
					<dt>Number of queries</dt>
					<dd><?php echo DB::getNumQueries(); ?></dd>
				</dl>
			</li>
			<li>
				<h4>Routes</h4>

				<dl>
					<?php foreach($tplVars['routes'] as $k => $v) { ?>
						<dt><?php echo $k; ?></dt>
						<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
					<?php } ?>
				</dl>
			</li>
			<?php if (count(Router::$params)) { ?>
				<li>
					<h4>Route params</h4>

					<dl>
						<?php foreach(Router::$params as $k => $v) { ?>
							<dt><?php echo $k; ?></dt>
							<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
						<?php } ?>
					</dl>
				</li>
			<?php } ?>
		</ul>
	</li>
<?php /*	<li>
		<h3>Config</h3>

		<ul>
			<?php foreach ($tplVars['config'] as $config) { ?>
				<li>
					<h4><?php echo escHTML($config['info']['title']); ?></h4>

					<dl>
						<?php foreach ($config['items'] as $item) { ?>
							<dt><?php echo escHTML($item['name']); ?></dt>
							<dd><?php echo escHTML($item['value']); ?></dd>
						<?php } ?>
					</dl>
				</li>
			<?php } ?>
		</ul>
	</li> */ ?>
	<li>
		<h3>Modules</h3>

		<ul>
			<?php foreach($tplVars['modules'] as $mod) { ?>
				<li>
					<h4><?php echo $mod['classes'] ? $mod['classes'][0]['class_name'] : '[NoClass]' .'_' .$mod['name']; ?></h4>

					<dl>
						<dt>Module classes</dt>
						<dd>
							<?php if ($mod['classes']) { ?>
								<ul>
									<?php foreach ($mod['classes'] as $modClass) { ?>
										<li>
											<?php echo $modClass['class_name']; ?><br />
											<small><?php echo round($modClass['run_time'], 5); ?> sec(s), <?php echo $modClass['num_queries']; ?> queries</small>
										</li>
									<?php } ?>
								</ul>
							<?php } else { ?>
								[none]
							<?php } ?>
						</dd>
						<dt>Template paths</dt>
						<dd>
							<?php if(count($mod['tpl_paths'])) { ?>
								<dl>
									<?php foreach($mod['tpl_paths'] as $k => $v) { ?>
										<dt><?php echo ucfirst($k); ?></dt>
										<dd><?php echo $v != '' ? str_replace(DOCROOT, '', $v) : '[empty]'; ?></dd>
									<?php } ?>
								</dl>
							<?php } else { ?>
								[none]
							<?php } ?>
						</dd>
						<dt>Template variables</dt>
						<dd>
							<?php if(count($mod['tpl_vars'])) { ?>
								<dl>
									<?php foreach($mod['tpl_vars'] as $k => $v) { ?>
										<dt><?php echo $k; ?></dt>
										<dd>
											<?php 
												if(is_array($v)) {
													echo '<pre>';
													varDumpEscHTML($v);
													echo '</pre>';
												}
												else {
													echo escHTML($v) != '' ? escHTML($v) : '[empty]';
												}
											?>
										</dd>
									<?php } ?>
								</dl>
							<?php } else { ?>
								[none]
							<?php } ?>
						</dd>
					</dl>
				</li>
			<?php } ?>
		</ul>
	</li>
	<li>
		<h3>$_GLOBAL variables</h3>

		<ul>
			<?php foreach (array('GET' => $_GET, 'POST' => $_POST, 'SESSION' => $_SESSION, 'COOKIE' => $_COOKIE, 'REQUEST' => $_REQUEST, 'SERVER' => $_SERVER) as $ok => $ov) { ?>					
				<?php if(count($ov)) { ?>
					<li>
						<h4>$_<?php echo $ok; ?></h4>

						<dl>
							<?php foreach($ov as $k => $v) { ?>
								<dt><?php echo $k; ?></dt>
								<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
							<?php } ?>
						</dl>
					</li>
				<?php } ?>
			<?php } ?>
		</ul>
	</li>
</ul>
