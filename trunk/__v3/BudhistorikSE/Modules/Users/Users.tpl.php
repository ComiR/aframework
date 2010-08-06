<h2>Mäklare</h2>

<ul>
	<?php foreach ($users as $user) { ?>
		<li>
			<h3>
				<a href="<?php echo Router::urlFor('User', $user); ?>">
					<?php echo escHTML($user['first_name']); ?> <?php echo escHTML($user['last_name']); ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($user['description'], 4, false, 150); ?>

			<p><a href="<?php echo Router::urlFor('User', $user); ?>">Läs mer &raquo;</a></p>
		</li>
	<?php } ?>
</ul>