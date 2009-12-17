<h2>ControllerAdmin</h2>

<?php if (CONTROLLER_ADMIN) { ?>
	<p><a href="?no_controller_admin">Disable Controller Admin</a></p>
<?php } else { ?>
	<p><a href="?controller_admin">Enable Controller Admin</a></p>
<?php } ?>

<?php if (CONTROLLER_ADMIN) { ?>
	<ul>
		<?php foreach ($available_modules as $module) { if (!$module['in_use']) { ?>
			<li>
				<h3><?php echo escHTML(ccFix($module['name'], ' ')); ?></h3>

				<img src="<?php echo $module['thumb']; ?>" alt=""/>
			</li>
		<?php } } ?>
	</ul>
<?php } ?>
