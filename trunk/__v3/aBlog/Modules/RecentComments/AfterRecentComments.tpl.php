<ul>
	<li>
		<?php if ($prev === false) { ?>
			<?php echo Lang::get('newer'); ?>
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $prev; ?>"><?php echo Lang::get('newer'); ?></a>
		<?php } ?>
	</li>
	<li>
		<?php if ($next === false) { ?>
			<?php echo Lang::get('older'); ?>
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $next; ?>"><?php echo Lang::get('older'); ?></a>
		<?php } ?>
	</li>
</ul>