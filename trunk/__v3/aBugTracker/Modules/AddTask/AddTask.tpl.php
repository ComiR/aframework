<h2>
	<a href="<?php echo Router::urlFor('Tasks', $project); ?>">
		<?php echo Lang::get('Tasks for PROJECT', array($project['title'])); ?>
	</a> &rarr; <?php echo Lang::get('Add Task'); ?>
</h2>

<?php echo $form_html; ?>
