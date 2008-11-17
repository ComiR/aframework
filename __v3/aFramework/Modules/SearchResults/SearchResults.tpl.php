<ol<?php echo @$_GET['start'] > 0 ? ' start="' .($_GET['start'] + 1) .'"' : '' ?>>
	<?php foreach($results as $sr) { ?>
		<li>
			<h3><a href="<?php echo $sr['url']; ?>"><?php echo $sr['title']; ?></a></h3>

			<p><?php echo $sr['content']; ?><br /><a href="<?php echo $sr['url']; ?>">Read more</a></p>
		</li>
	<?php } ?>
</ol>