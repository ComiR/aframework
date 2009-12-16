<?php if (CONTROLLER_ADMIN) { ?>
	<p><a href="?no_controller_admin">Disable Controller Admin</a></p>
<?php } else { ?>
	<p><a href="?controller_admin">Enable Controller Admin</a></p>
<?php } ?>

<?php if (CONTROLLER_ADMIN) { ?>
	<ul>
		<?php foreach ($available_modules as $module) { if (!$module['in_use']) { ?>
			<li>
				<img src="<?php echo $module['thumb']; ?>" alt=""/><br/>
				<?php echo htmlentities(ccFix($module['name'], ' ')); ?>
			</li>
		<?php } } ?>
	</ul>
<?php } ?>
