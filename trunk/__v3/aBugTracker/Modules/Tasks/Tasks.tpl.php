<h2>
	<?php echo Lang::get('Tasks for PROJECT', array($project['title'])); ?> 
	(<?php echo $project['tasks'] ? count($project['tasks']) : 0; ?>)
</h2>

<p>
	<a href="<?php echo Router::urlFor('AddTask', $project); ?>">
		<?php echo Lang::get('Add Task'); ?>
	</a>
</p>

<table>
	<tr>
		<th><?php echo Lang::get('Title'); ?></th>
		<th><?php echo Lang::get('Content'); ?></th>
		<th><?php echo Lang::get('Priority'); ?></th>
		<th><?php echo Lang::get('State'); ?></th>
	</tr>
	<?php foreach ($project['tasks'] as $task) { ?>
		<tr<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
			<td><a href="<?php echo Router::urlFor('Task', $task); ?>"><?php echo escHTML($task['title']); ?></a></td>
			<td><?php echo escHTML(substr($task['content'], 0, 50)); ?>...</td>
			<td><?php echo Lang::get($task['priority']); ?></td>
			<td><?php echo Lang::get($task['state']); ?></td>
		</tr>
	<?php } ?>
</table>