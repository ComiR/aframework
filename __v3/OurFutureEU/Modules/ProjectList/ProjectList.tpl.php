<ul>
	<?php foreach ($projects as $project) { ?>
		<li class="project-<?php echo $project['pages_id']; ?>">
			<a href="<?php echo Router::urlFor('ProjectPage', $project); ?>">
				<?php echo escHTML($project['title']); ?>
			</a>
		</li>
	<?php } ?>
</ul>
