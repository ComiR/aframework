<div id="debug">
	
	<h2>Debugging Controller <?php echo $controller['name']; ?></h2>

	<p><?php echo $controller['path']; ?></p>

	<?php if(isset($__old)) { ?>
		<p><strong>This controller was forced by some module in old controller <?php echo $__old['controller']['name']; ?></strong></p>
	<?php } ?>

	<h3>Modules</h3>

	<ul>
		<?php foreach($modules as $mod) { ?>
			<li>
				<h4><?php echo $mod['name']; ?></h4>

				<p><?php echo $mod['path'] ? $mod['path'] : '[no module-class]'; ?></p>

				<dl>
					<dt>Run time</dt>
					<dd><?php echo $mod['run_time'] ? $mod['run_time'] : '[no run]'; ?></dd>
					<dt>Number of queries</dt>
					<dd><?php echo $mod['num_queries'] ? $mod['num_queries'] : '[no queries]'; ?></dd>
					<dt>View</dt>
					<dd><?php echo $mod['tpl_file'] ? $mod['tpl_file'] : 'no'; ?></dd>
					<dt>Force controller</dt>
					<dd><?php echo $mod['force_controller'] ? $mod['force_controller'] : 'no'; ?></dd>
					<dt>Template paths</dt>
					<dd>
						<?php if(count($mod['tpl_paths'])) { ?>
							<dl>
								<?php foreach($mod['tpl_paths'] as $k => $v) { ?>
									<dt><?php echo ucfirst($k); ?></dt>
									<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
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
									<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
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

</div>
<!--
<script type="text/javascript">
	$('#debug').addClass('hide').find('h2').toggle(function() {
		$('#debug').toggleClass('hide');
	});
</script>
-->