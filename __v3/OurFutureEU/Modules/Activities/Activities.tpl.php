<h2><?php echo Lang::get('Activities for') . ' ' . $date; ?></h2>

<ol>
	<?php foreach ($activities as $activity) { ?>
		<li>
			<h3><?php echo escHTML($activity['title']); ?></h3>

			<?php echo NiceString::makeNice($activity['content'], 4); ?>
		</li>
	<?php } ?>
</ol>
