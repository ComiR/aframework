<h2><?php echo Lang::get('All Projects'); ?></h2>

<ul>
	<?php foreach ($projects as $project) { ?>
		<li>
			<a href="<?php echo Router::urlFor('Tasks', $project); ?>">
				<img src="<?php echo $project['thumb_src']; ?>" alt=""/><br/>
				<?php echo escHTML($project['title']); ?>
			</a> (<?php echo $project['num_tasks']; ?>)
		</li>
	<?php } ?>
</ul>
