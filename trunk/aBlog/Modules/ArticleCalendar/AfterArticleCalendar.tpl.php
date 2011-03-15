<ul>
	<li>
		<?php if ($previous_month['url']) { ?>
			<a href="<?php echo $previous_month['url']; ?>">
				<?php echo escHTML($previous_month['title']); ?>
			</a>
		<?php } else { ?>
			<?php echo escHTML($previous_month['title']); ?>
		<?php } ?>
	</li>
	<li>
		<?php if ($next_month['url']) { ?>
			<a href="<?php echo $next_month['url']; ?>">
				<?php echo escHTML($next_month['title']); ?>
			</a>
		<?php } else { ?>
			<?php echo escHTML($next_month['title']); ?>
		<?php } ?>
	</li>
</ul>
