<h2>
	<?php echo escHTML($user['first_name']); ?> <?php echo escHTML($user['last_name']); ?>
</h2>


<?php echo NiceString::makeNice($user['description'], 4, false, 150); ?>

<a href="http://klara.maklarsamfundet.se/pubweb/searchbroker/sok_maklare_person.aspx?PersonID=<?php echo $user['official_id']; ?>">Till Mäklarsamfundet</a>
