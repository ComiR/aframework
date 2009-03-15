<ul>
	<?php foreach ($plugins as $plugin) { ?>
		<li>
			<h3>
				<a href="<?php echo $plugin['url']; ?>">
					<?php echo $plugin['title']; ?>
				</a>
			</h3>

			<?php echo $plugin['does']; ?>

			<dl>
			<!--<dt><?php echo Lang::get('author'); ?></dt>
				<dd><?php echo $plugin['author']; ?></dd>-->
				<dt><?php echo Lang::get('version'); ?></dt>
				<dd><?php echo $plugin['version']; ?></dd>
				<dt><?php echo Lang::get('download'); ?></dt>
				<dd><a href="<?php echo WEBROOT . '?module=ZipIt&amp;files=' . $plugin['files']['csv_names']; ?>"><?php echo Lang::get('zip'); ?></a></dd>
			</dl>

			<p>
				<a href="<?php echo $plugin['url']; ?>">
					<?php echo Lang::get('details'); ?>
				</a>
			</p>
		</li>
	<?php } ?>
</ul>