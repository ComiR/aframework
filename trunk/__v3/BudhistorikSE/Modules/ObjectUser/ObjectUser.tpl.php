<h3>Ansvarig Mäklare</h3>

<h4>
	<a href="<?php echo Router::urlFor('User', $user); ?>">
		<?php echo escHTML($user['first_name']); ?> <?php echo escHTML($user['last_name']); ?>
	</a>
</h4>

<?php echo NiceString::makeNice($user['description'], 4, false, 150); ?>