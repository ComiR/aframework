<h2>
	<?php echo Lang::get('Tasks for PROJECT', array($project['title'])); ?>
</h2>

<p>
	<a href="<?php echo Router::urlFor('AddTask'); ?>">
		<?php echo Lang::get('Add Task'); ?>
	</a>
</p>

<table>
	<tr>
		<th><?php echo Lang::get('Title'); ?></th>
		<th><?php echo Lang::get('Content'); ?></th>
		<th><?php echo Lang::get('Category'); ?></th>
		<th><?php echo Lang::get('Priority'); ?></th>
		<th><?php echo Lang::get('State'); ?></th>
	</tr>
	<?php foreach ($project['tasks'] as $task) { ?>
		<tr<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
			<td><a href="<?php echo Router::urlFor('Task', $task); ?>"><?php echo escHTML($task['title']); ?></a></td>
			<td><?php echo escHTML(substr($task['content'], 0, 80)); ?></td>
			<td><?php echo Lang::get($task['category_title']); ?></td>
			<td><?php echo Lang::get($task['priority']); ?></td>
			<td><?php echo Lang::get($task['state']); ?></td>
		</tr>
	<?php } ?>
</table>
