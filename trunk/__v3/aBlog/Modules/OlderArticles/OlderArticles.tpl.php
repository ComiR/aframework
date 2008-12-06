<ol>
	<?php foreach($articles as $a) { ?>
		<li>
			<h3><a href="<?php echo $a['url']; ?>"><?php echo $a['title']; ?></a></h3>

			<p><small>Published <?php echo $a['pub_date']; ?></small></p>

			<?php echo $a['excerpt']; ?>

			<p><a href="<?php echo $a['url']; ?>">Continue reading</a></p>

			<!--
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
			-->
		</li>
	<?php } ?>
</ol>