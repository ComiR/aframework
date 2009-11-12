<ul>
	<li>
		<?php if ($previous_month['url']) { ?>
			<a href="<?php echo $previous_month['url']; ?>">
				<?php echo htmlentities($previous_month['title']); ?>
			</a>
		<?php } else { ?>
			<?php echo htmlentities($previous_month['title']); ?>
		<?php } ?>
	</li>
	<li>
		<?php if ($next_month['url']) { ?>
			<a href="<?php echo $next_month['url']; ?>">
				<?php echo htmlentities($next_month['title']); ?>
			</a>
		<?php } else { ?>
			<?php echo htmlentities($next_month['title']); ?>
		<?php } ?>
	</li>
</ul>
