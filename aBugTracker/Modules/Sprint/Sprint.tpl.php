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
		<?php echo Lang::get('From %0 to %1.', array(date(Config::get('general.date_format'), strtotime($sprint['start_date'])), date(Config::get('general.date_format'), strtotime($sprint['end_date'])))); ?> 
		<strong><?php echo Lang::get('%0 (of %1) tasks finished on day %2 (of %3).', array($sprint['num_finished_tasks'], $sprint['num_total_tasks'], $sprint['today_num'], $sprint['num_total_days'])); ?></strong>
	</small>
</p>

<h3><?php echo Lang::get('Days in Sprint'); ?></h3>

<ol>
	<?php $i = 0; foreach ($sprint['days'] as $day) { $i++; ?>
		<li>
			<h4><?php echo date('l jS \of F', strtotime($day['date'])); ?></h4>

			<?php if ($day['has_happened']) { ?>
				<p>
					<?php
						echo Lang::get('%0% completed on day %1 with %2 fixed tasks. %3/%4 fixed in total now.', array(
								$day['percent'], 
								$i, 
								$day['num_finished_tasks'], 
								$day['num_finished_tasks_total'], 
								count($sprint['tasks'])));
					?>
				</p>

				<?php if ($day['finished_tasks']) { ?>
					<ul>
						<?php foreach ($day['finished_tasks'] as $task) { ?>
							<li>
								<a href="<?php echo Router::urlFor('Tasks', $task); ?>">
									<?php echo escHTML($task['project_title']); ?>
								</a> &rarr; 
								<a href="<?php echo Router::urlFor('Task', $task); ?>">
									<?php echo escHTML($task['title']); ?>
								</a>
							</li>
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
	<?php foreach ($sprint['tasks'] as $task) { if ($task['state'] != 'Done') { ?>
		<li<?php if ($task['state'] == 'Done') { ?> class="done"<?php } ?>>
			<a href="<?php echo Router::urlFor('Tasks', $task); ?>">
				<img src="<?php echo file_exists($task['project_thumb_path']) ? $task['project_thumb_src'] : WEBROOT . 'aFramework/generic.png'; ?>" alt=""/> 
				<?php echo escHTML($task['project_title']); ?>
			</a> &rarr; 
			<a href="<?php echo Router::urlFor('Task', $task); ?>">
				<?php echo escHTML($task['title']); ?>
			</a> (<?php echo Lang::get($task['state']); ?>)
		</li>
	<?php } } ?>
</ul>
