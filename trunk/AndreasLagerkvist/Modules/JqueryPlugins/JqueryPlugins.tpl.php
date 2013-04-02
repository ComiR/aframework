<ul>
	<?php foreach ($plugins as $plugin) { ?>
		<li>
			<h3>
				<a href="<?php echo $plugin['url']; ?>">
					<?php echo $plugin['title']; ?>
				</a>
			</h3>

			<?php echo $plugin['does_short']; ?>

			<dl>
			<!--<dt><?php echo Lang::get('Author'); ?></dt>
				<dd><?php echo $plugin['author']; ?></dd>-->
				<dt><?php echo Lang::get('Version'); ?></dt>
				<dd><?php echo $plugin['version']; ?></dd>
			<!--<dt><?php echo Lang::get('Download'); ?></dt>
				<dd><a href="<?php echo WEBROOT . '?module=ZipIt&amp;files=' . $plugin['files']['csv_names']; ?>"><?php echo Lang::get('Zip'); ?></a></dd-->
			</dl>

			<p>
				<a href="<?php echo $plugin['url']; ?>">
					<?php echo Lang::get('Details'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ul>
