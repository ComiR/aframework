<h2 class="<?php echo strtolower(str_replace(' ', '-', $task['priority'])); ?> <?php echo strtolower(str_replace(' ', '-', $task['state'])); ?>">
	<a href="<?php echo Router::urlFor('Tasks', $task); ?>">
		<?php echo escHTML($task['project_title']); ?>
	</a> &rarr; <?php echo escHTML($task['title']); ?> 
	(#<?php echo $task['bt_tasks_id']; ?>)
</h2>

<p>
	<small>
		<?php echo date(Config::get('general.date_format'), strtotime($task['pub_date'])); ?>
	</small>
</p>

<dl>
	<dt><?php echo Lang::get('Created by'); ?></dt>
	<dd><img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $task['author_email_md5']; ?>" alt="<?php echo Lang::get('E-mail not revealed'); ?>"/></dd>
	<dt>
		<?php if ($task['state'] == 'Done') { ?>
			<?php echo Lang::get('Fixed by'); ?>
		<?php } else { ?>
			<?php echo Lang::get('Assigned to'); ?>
		<?php } ?>
	</dt>
	<dd>
		<?php if ($task['assigned_email_md5']) { ?>
			<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $task['assigned_email_md5']; ?>" alt="<?php echo Lang::get('E-mail not revealed'); ?>"/>
		<?php } else { ?>
			<?php echo Lang::get('nobody'); ?>
		<?php } ?>
	</dd>
	<dt><?php echo Lang::get('Priority'); ?></dt>
	<dd><?php echo Lang::get($task['priority']); ?></dd>
	<dt><?php echo Lang::get('State'); ?></dt>
	<dd><?php echo Lang::get($task['state']); ?></dd>
	<?php if ($task['sprint_title']) { ?>
		<dt><?php echo Lang::get('Sprint'); ?></dt>
		<dd><?php echo escHTML($task['sprint_title']); ?></dd>
	<?php } ?>
</dl>

<?php echo NiceString::makeNice($task['content'], 3); ?>

<h3><?php echo Lang::get('Update this Task'); ?></h3>

<?php echo $form_html; ?>
