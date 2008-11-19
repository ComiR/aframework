<ol>
	<?php for($i = 0; $i < Config::get('ablog.num_recent_stuff'); $i++) { ?>
		<li>
			<h3><a href="#">Older article <?php echo $i; ?></a></h3>

			<p>Lorem ipsum dolorus consequetuer ipsum. Consiquitus fredrolia samus. Lorem ipsum dolorus consequetuer ipsum. Consiquitus fredrolia samus.</p>

			<dl>
				<dt>Tags</dt>
				<dd>
					<ul>
						<li><a href="#">jquery</a></li>
						<li><a href="#">news</a></li>
					</ul>
				</dd>
				<dt>Comments</dt>
				<dd><a href="#">12 comments</a></dd>
			</dl>
		</li>
	<?php } ?>
</ol>