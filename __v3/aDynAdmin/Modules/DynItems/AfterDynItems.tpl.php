<ul>
	<li>
		<?php if ($start) { ?>
			<a href="<?php echo appendToQryStr('start=' . ($start - Config::get('adynadmin.num_items_per_page'))); ?>">
				<?php echo Lang::get('Previous'); ?>
			</a>
		<?php } else { ?>
			<?php echo Lang::get('Previous'); ?>
		<?php } ?>
	</li>
	<li>
		<a href="<?php echo appendToQryStr('start=' . ($start + Config::get('adynadmin.num_items_per_page'))); ?>">
			<?php echo Lang::get('Next'); ?>
		</a>
	</li>
</ul>
