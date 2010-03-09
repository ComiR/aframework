<h2><?php echo Lang::get('Activities for') . ' ' . $date; ?></h2>

<ol>
	<?php foreach ($activities as $activity) { ?>
		<li>
			<h3><?php echo escHTML($activity['title']); ?></h3>

			<?php echo NiceString::makeNice($activity['content'], 4); ?>

			<?php if (SU) { ?>
				<form method="post" action="">

					<p>
						<input type="hidden" name="delete_activity" value="1"/>
						<input type="hidden" name="activities_id" value="<?php echo $activity['activities_id']; ?>"/>
						<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
					</p>

				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ol>
