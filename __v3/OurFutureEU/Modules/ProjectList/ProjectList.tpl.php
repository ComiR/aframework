<ul>
	<?php foreach ($projects as $project) { ?>
		<li class="project-<?php echo $project['pages_id']; ?>">
			<a href="<?php echo Router::urlFor('ProjectPage', $project); ?>"<?php if ($project['selected']) { ?> class="selected"<?php } ?>>
				<?php if ($only_first_word) { ?>
					<?php $words = explode(' ', $project['title']); echo escHTML($words[0]); ?>
				<?php } else { ?>
					<?php echo escHTML($project['title']); ?>
				<?php } ?>
			</a>
		</li>
	<?php } ?>
</ul>
