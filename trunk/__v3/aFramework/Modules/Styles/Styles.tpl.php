<ul>
	<?php foreach ($styles as $style) { ?>
		<li<?php if (aFramework_BaseModule::$tplVars['style'] == $style['name']) { ?> class="selected"<?php } ?>>
			<h3>
				<a href="?style=<?php echo $style['name']; ?>">
					<?php echo escHTML($style['title']); ?>
				</a>
			</h3>

			<?php if ($style['thumb']) { ?>
				<p>
					<a href="<?php echo $style['thumb']; ?>">
						<img src="<?php echo $style['thumb']; ?>" alt=""/>
					</a>
				</p>
			<?php } ?>

			<dl>
				<dt><?php echo Lang::get('Author'); ?></dt>
				<dd><?php echo escHTML($style['author']); ?></dd>
				<dt><?php echo Lang::get('Date'); ?></dt>
				<dd><?php echo date(Config::get('general.date_format'), strtotime($style['date'])); ?></dd>
			</dl>

			<p>
				<?php if (aFramework_BaseModule::$tplVars['style'] == $style['name']) { ?>
					<?php echo Lang::get('This style is currently in use.'); ?>
				<?php } else { ?>
					<a href="?style=<?php echo $style['name']; ?>">
						<?php echo Lang::get('Use this style'); ?>
					</a>
				<?php } ?>
			</p>
		</li>
	<?php } ?>
</ul>
