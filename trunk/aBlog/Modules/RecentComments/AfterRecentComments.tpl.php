<ul>
	<li>
		<?php if ($prev === false) { ?>
			<?php echo Lang::get('Newer'); ?>
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $prev; ?>"><?php echo Lang::get('Newer'); ?></a>
		<?php } ?>
	</li>
	<li>
		<?php if ($next === false) { ?>
			<?php echo Lang::get('Older'); ?>
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $next; ?>"><?php echo Lang::get('Older'); ?></a>
		<?php } ?>
	</li>
</ul>