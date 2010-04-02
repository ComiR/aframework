<h2>
	<a href="<?php echo Router::urlFor('Tasks', $project); ?>">
		<?php echo escHTML($project['title']); ?>
	</a> &rarr; <?php echo Lang::get('Add Task'); ?>
</h2>

<div>

	<h3><?php echo Lang::get('Help'); ?></h3>

	<p><?php echo Lang::get('You are adding a task to %0. Simply fill out the form and your task will be added immediately.', array($project['title'])); ?></p>

	<p><?php echo Lang::get('Please try to be as clear as possible and include as many details as you can.'); ?></p>

	<p><?php echo Lang::get('Make sure you use a valid e-mail in case clarifications are needed.'); ?></p>

</div>

<?php echo $form_html; ?>
