<h3>Mäklare på det här kontoret</h3>

<ul>
	<?php foreach ($users as $user) { ?>
		<li>
			<a href="<?php echo Router::urlFor('User', $user); ?>">
				<?php echo escHTML($user['first_name']); ?> <?php echo escHTML($user['last_name']); ?>
			</a>
		</li>
	<?php } ?>
</ul>