<ul>
	<?php foreach ($projects as $project) { ?>
		<li>
			<a href="<?php echo Router::urlFor('ProjectPage', $project); ?>">
				<?php echo escHTML($project['title']); ?>
			</a>
		</li>
	<?php } ?>
</ul>
