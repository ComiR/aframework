<h2>aFramework Debug <span>- Debugging <?php echo $controller['site'] .'_' .$controller['name']; ?></span></h2>

<div id="debug-inner">

	<p><?php echo str_replace(DOCROOT, '', $controller['path']); ?></p>
<!--
	<?php if(isset($__old)) { ?>
		<p><strong>This controller was forced by module <?php echo $__old['controller']['forced_by']; ?> in old controller <?php echo $__old['controller']['name']; ?></strong></p>
	<?php } ?>

	<dl>
		<dt>Run time</dt>
		<dd><?php echo $controller['run_time']; ?> sec(s)</dd>
		<dt>Num queries</dt>
		<dd><?php echo $controller['num_queries']; ?></dd>
	</dl>
-->
	<h3>Routes</h3>

	<dl>
		<?php foreach($routes as $k => $v) { ?>
			<dt><?php echo $k; ?></dt>
			<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
		<?php } ?>
	</dl>

	<?php if(count($_GET)) { ?>
		<h3>GET-data</h3>

		<dl>
			<?php foreach($_GET as $k => $v) { ?>
				<dt><?php echo $k; ?></dt>
				<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
			<?php } ?>
		</dl>
	<?php } ?>

	<?php if(count($_POST)) { ?>
		<h3>POST-data</h3>

		<dl>
			<?php foreach($_POST as $k => $v) { ?>
				<dt><?php echo $k; ?></dt>
				<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
			<?php } ?>
		</dl>
	<?php } ?>

	<?php if(count($_SESSION)) { ?>
		<h3>SESSION-data</h3>

		<dl>
			<?php foreach($_SESSION as $k => $v) { ?>
				<dt><?php echo $k; ?></dt>
				<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
			<?php } ?>
		</dl>
	<?php } ?>

	<?php if(count($_COOKIE)) { ?>
		<h3>COOKIE-data</h3>

		<dl>
			<?php foreach($_COOKIE as $k => $v) { ?>
				<dt><?php echo $k; ?></dt>
				<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
			<?php } ?>
		</dl>
	<?php } ?>

	<h3>Modules</h3>

	<ul>
		<?php foreach($modules as $mod) { ?>
			<li title="<?php echo $mod['html_id']; ?>">
				<h4><?php echo $mod['class_name'] ? $mod['class_name'] : '[NoClass]' .'_' .$mod['name']; ?></h4>

				<p><?php echo isset($mod['path']) ? str_replace(DOCROOT, '', $mod['path']) : '[no module-class]'; ?></p>

				<dl>
					<dt>Run time</dt>
					<dd><?php echo $mod['run_time'] ? $mod['run_time'] : '[no run]'; ?> sec(s)</dd>
					<dt>Number of queries</dt>
					<dd><?php echo $mod['num_queries'] ? $mod['num_queries'] : '[none]'; ?></dd>
					<!--
						<dt>View</dt>
						<dd><?php echo $mod['tpl_file'] ? $mod['tpl_file'] === true ? '[yes]' : $mod['tpl_file'] : '[no]'; ?></dd>
						<dt>Force controller</dt>
						<dd><?php echo $mod['force_controller'] ? $mod['force_controller'] : '[no]'; ?></dd>
					-->
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
												var_dump($v);
												echo '</pre>';
											}
											else {
												echo $v != '' ? $v : '[empty]';
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

</div>