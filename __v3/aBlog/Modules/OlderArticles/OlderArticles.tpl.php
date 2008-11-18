<ol>
	<?php for($i = 0; $i < Config::get('ablog.num_recent_stuff'); $i++) { ?>
		<li>
			<h3><a href="#">Older article <?php echo $i; ?></a></h3>

			<p>Lorem ipsum dolorus consequetuer ipsum. Consiquitus fredrolia samus. Lorem ipsum dolorus consequetuer ipsum. Consiquitus fredrolia samus.</p>

			<p>Tagged with <a href="#">jquery</a>, <a href="#">news</a> | <a href="#">12 comments</a></p>
		</li>
	<?php } ?>
</ol>