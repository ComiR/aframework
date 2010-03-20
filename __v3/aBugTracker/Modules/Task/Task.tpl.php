<h2>
	<a href="<?php echo Router::urlFor('Tasks', $task); ?>">
		<?php echo escHTML($task['project_title']); ?>
	</a> &rarr; <?php echo escHTML($task['title']); ?>
</h2>

<dl>
	<dt><?php echo Lang::get('Date'); ?></dt>
	<dd><?php echo date(Config::get('general.date_format'), strtotime($task['pub_date'])); ?></dd>
	<dt><?php echo Lang::get('Priority'); ?></dt>
	<dd><?php echo Lang::get($task['priority']); ?></dd>
	<dt><?php echo Lang::get('State'); ?></dt>
	<dd><?php echo Lang::get($task['state']); ?></dd>
	<dt><?php echo Lang::get('Category'); ?></dt>
	<dd><?php echo Lang::get($task['category_title']); ?></dd>
</dl>

<?php echo NiceString::makeNice($task['content'], 3); ?>
