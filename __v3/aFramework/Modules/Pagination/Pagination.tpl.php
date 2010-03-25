<ul>
	<li>
		<?php if ($previous_page) { ?>
			<a href="<?php echo $previous_page['url']; ?>">
				<?php echo Lang::get('Previous'); ?>
			</a>
		<?php } else { ?>
			<?php echo Lang::get('Previous'); ?>
		<?php } ?>
	</li>
	<?php foreach ($pages as $page) { ?>
		<?php if (!$page['hidden']) { ?>
			<li>
				<?php if ($page['selected']) { ?>
					<strong>
						<?php echo $page['num']; ?>
					</strong>
				<?php } elseif ($page['url']) { ?>
					<a href="<?php echo $page['url']; ?>">
						<?php echo $page['num']; ?>
					</a>
				<?php } else { ?>
					<abbr title="<?php echo Lang::get('Skipping pages'); ?>">
						...
					</abbr>
				<?php } ?>
			</li>
		<?php } ?>
	<?php } ?>
	<li>
		<?php if ($next_page) { ?>
			<a href="<?php echo $next_page['url']; ?>">
				<?php echo Lang::get('Next'); ?>
			</a>
		<?php } else { ?>
			<?php echo Lang::get('Next'); ?>
		<?php } ?>
	</li>
</ul>
