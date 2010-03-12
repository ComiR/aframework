<h2><?php echo Lang::get('Activities for') . ' ' . $date; ?></h2>

<?php if ($activities) { ?>
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
<?php } ?>

<?php if (ADMIN) { ?>
	<h3><?php echo Lang::get('Add Activity'); ?></h3>

	<form method="post" action="">

		<p>
			<label>
				<?php echo Lang::get('Content'); ?><br/>
				<textarea name="content" rows="4" cols="40"></textarea>
			</label>
		</p>

		<p>
			<input type="hidden" name="add_activity" value="1"/>
			<input type="hidden" name="pub_date" value="<?php echo $ymdate; ?>"/>
			<input type="submit"/>
		</p>

	</form>
<?php } ?>
