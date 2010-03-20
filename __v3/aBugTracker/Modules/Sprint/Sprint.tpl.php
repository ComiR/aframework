<h2>
	<?php if ($sprint['in_progress']) { ?>
		<strong><?php echo Lang::get('In Progress:'); ?></strong> 
	<?php } else { ?>
		<strong><?php echo Lang::get('Old Sprint:'); ?></strong> 
	<?php } ?>
	<?php echo escHTML($sprint['title']); ?>
</h2>

<p>
	<small>
		<?php echo Lang::get('From START to END', array(date(Config::get('general.date_format'), strtotime($sprint['start_date'])), date(Config::get('general.date_format'), strtotime($sprint['end_date'])))); ?>
	</small>
</p>

<h3><?php echo Lang::get('Days in Sprint'); ?></h3>

<ol>
	<?php $i = 0; foreach ($sprint['days'] as $day) { $i++; ?>
		<li>
			<h4><?php echo date('l jS \of F', strtotime($day['date'])); ?></h4>

			<?php if ($day['has_happened']) { ?>
				<p><?php echo Lang::get('NUM% completed on day NUM with NUM fixed tasks (NUM fixed in total now).', array($day['percent'], $i, $day['num_finished_tasks'], $day['num_finished_tasks_total'])); ?></p>

				<?php if ($day['finished_tasks']) { ?>
					<ul>
						<?php foreach ($day['finished_tasks'] as $task) { ?>
							<li><?php echo escHTML($task['title']); ?> GTG</li>
						<?php } ?>
					</ul>
				<?php } ?>
			<?php } else { ?>
				<p><strong><?php echo Lang::get("This day hasn't happened yet."); ?></strong></p>
			<?php } ?>
		</li>
	<?php } ?>
</ol>

<h3><?php echo Lang::get('Tasks to be Completed'); ?></h3>

<ul>
	<?php foreach ($sprint['tasks'] as $task) { ?>
		<li<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
			<a href="<?php echo Router::urlFor('Tasks', $task); ?>">
				<?php echo escHTML($task['project_title']); ?>
			</a> &rarr; 
			<a href="<?php echo Router::urlFor('Task', $task); ?>">
				<?php echo escHTML($task['title']); ?>
			</a> (<?php echo Lang::get($task['state']); ?>)
		</li>
	<?php } ?>
</ul>
