<h2>
	<?php echo Lang::get('Tasks for PROJECT', array($project['title'])); ?> 
	(<?php echo $all_tasks ? count($all_tasks) : 0; ?>)
</h2>

<p>
	<a href="<?php echo Router::urlFor('AddTask', $project); ?>">
		<?php echo Lang::get('Add a Task to PROJECT', array($project['title'])); ?>
	</a>
</p>

<?php if (!$urgent_tasks and !$must_have_tasks and !$idea_tasks) { ?>
	<p><?php echo Lang::get('There are no tasks for this project. Click the link above to add one.'); ?></p>
<?php } ?>

<?php if ($urgent_tasks) { ?>
	<h3><?php echo Lang::get('Urgent Tasks'); ?> (<?php echo count($urgent_tasks); ?>)</h3>

	<table class="urgent">
		<tr>
			<th><?php echo Lang::get('Title'); ?></th>
			<th title="Bug ID">#</th>
			<th><?php echo Lang::get('Content'); ?></th>
			<th><?php echo Lang::get('Date'); ?></th>
			<th><?php echo Lang::get('Sprint'); ?></th>
			<th><?php echo Lang::get('State'); ?></th>
		</tr>
		<?php foreach ($urgent_tasks as $task) { ?>
			<tr<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
				<td><a href="<?php echo Router::urlFor('Task', $task); ?>"><?php echo escHTML($task['title']); ?></a></td>
				<td><?php echo $task['bt_tasks_id']; ?></td>
				<td><?php echo escHTML(substr($task['content'], 0, 50)); ?>...</td>
				<td><?php echo date('F jS H:i', strtotime($task['pub_date'])); ?></td>
				<td><?php echo $task['sprint_id'] ? escHTML($task['sprint_title']) : Lang::get('No Sprint'); ?></td>
				<td><?php echo Lang::get($task['state']); ?></td>
			</tr>
		<?php } ?>
	</table>
<?php } ?>

<?php if ($must_have_tasks) { ?>
	<h3><?php echo Lang::get("Must Have's"); ?> (<?php echo count($must_have_tasks); ?>)</h3>

	<table class="must-have">
		<tr>
			<th><?php echo Lang::get('Title'); ?></th>
			<th title="Bug ID">#</th>
			<th><?php echo Lang::get('Content'); ?></th>
			<th><?php echo Lang::get('Date'); ?></th>
			<th><?php echo Lang::get('Sprint'); ?></th>
			<th><?php echo Lang::get('State'); ?></th>
		</tr>
		<?php foreach ($must_have_tasks as $task) { ?>
			<tr<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
				<td><a href="<?php echo Router::urlFor('Task', $task); ?>"><?php echo escHTML($task['title']); ?></a></td>
				<td><?php echo $task['bt_tasks_id']; ?></td>
				<td><?php echo escHTML(substr($task['content'], 0, 50)); ?>...</td>
				<td><?php echo date('F jS H:i', strtotime($task['pub_date'])); ?></td>
				<td><?php echo $task['sprint_id'] ? escHTML($task['sprint_title']) : Lang::get('No Sprint'); ?></td>
				<td><?php echo Lang::get($task['state']); ?></td>
			</tr>
		<?php } ?>
	</table>
<?php } ?>

<?php if ($idea_tasks) { ?>
	<h3><?php echo Lang::get('Ideas'); ?> (<?php echo count($idea_tasks); ?>)</h3>

	<table class="ideas">
		<tr>
			<th><?php echo Lang::get('Title'); ?></th>
			<th title="Bug ID">#</th>
			<th><?php echo Lang::get('Content'); ?></th>
			<th><?php echo Lang::get('Date'); ?></th>
			<th><?php echo Lang::get('Sprint'); ?></th>
			<th><?php echo Lang::get('State'); ?></th>
		</tr>
		<?php foreach ($idea_tasks as $task) { ?>
			<tr<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
				<td><a href="<?php echo Router::urlFor('Task', $task); ?>"><?php echo escHTML($task['title']); ?></a></td>
				<td><?php echo $task['bt_tasks_id']; ?></td>
				<td><?php echo escHTML(substr($task['content'], 0, 50)); ?>...</td>
				<td><?php echo date('F jS H:i', strtotime($task['pub_date'])); ?></td>
				<td><?php echo $task['sprint_id'] ? escHTML($task['sprint_title']) : Lang::get('No Sprint'); ?></td>
				<td><?php echo Lang::get($task['state']); ?></td>
			</tr>
		<?php } ?>
	</table>
<?php } ?>
