<ul>
	<li>
		<?php if (Router::getController() == 'DynAdmin') { ?>
			<strong>
				<?php echo Lang::get('Home'); ?>
			</strong>
		<?php } else { ?>
			<a href="<?php echo Router::urlFor('DynAdmin'); ?>">
				<?php echo Lang::get('Home'); ?>
			</a>
		<?php } ?>
	</li>
	<?php foreach ($tables as $table) { ?>
		<li>
			<?php if ($table['selected']) { ?>
				<strong>
					<?php echo escHTML($table['title']); ?>
				</strong>
			<?php } else { ?>
				<a href="<?php echo Router::urlFor('DynItems', array('table_name' => $table['name'])); ?>">
					<?php echo escHTML($table['title']); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?>
	<li>
		<?php if (Router::getController() == 'ConfigAdmin') { ?>
			<strong>
				<?php echo Lang::get('Config'); ?>
			</strong>
		<?php } else { ?>
			<a href="<?php echo Router::urlFor('ConfigAdmin'); ?>">
				<?php echo Lang::get('Config'); ?>
			</a>
		<?php } ?>
	</li>
	<li>
		<?php if (Router::getController() == 'DatabaseAdmin') { ?>
			<strong>
				<?php echo Lang::get('Tools'); ?>
			</strong>
		<?php } else { ?>
			<a href="<?php echo Router::urlFor('DatabaseAdmin'); ?>">
				<?php echo Lang::get('Tools'); ?>
			</a>
		<?php } ?>
	</li>
</ul>
