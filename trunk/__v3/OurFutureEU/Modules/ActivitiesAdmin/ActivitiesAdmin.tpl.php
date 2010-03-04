<h2><?php echo Lang::get('Activities Admin'); ?></h2>

<h3><?php echo Lang::get('Add Activity'); ?></h3>

<?php echo $form_html; ?>

<h3><?php echo Lang::get('Delete Activities'); ?></h3>

<ol>
	<?php foreach ($activities as $activity) { ?>
		<li>
			<?php echo escHTML($activity['title']); ?>

			<form method="post" action="">

				<p>
					<input type="hidden" name="delete_activity" value="1"/>
					<input type="hidden" name="username" value="<?php echo $username; ?>"/>
					<input type="hidden" name="password" value="<?php echo $password; ?>"/>
					<input type="hidden" name="activities_id" value="<?php echo $activity['activities_id']; ?>"/>
					<input type="submit" value="<?php echo Lang::get('Delete'); ?>"/>
				</p>

			</form>
		</li>
	<?php } ?>
</ol>
