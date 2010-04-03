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
				<a href="<?php echo Router::urlFor('DynItems', array('table_name' => $table['name_no_lang'])); ?>">
					<?php echo escHTML($table['title']); ?>
				</a>
			<?php } ?>
		</li>
	<?php } ?>
</ul>
