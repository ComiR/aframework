<h2>
	<a href="<?php echo Router::urlFor('Article', $article); ?>">
		<?php echo htmlentities($article['title']); ?>
	</a>
</h2>

<p>
	<small>
		<?php echo Lang::get('published'); ?> 
		<?php echo date(Config::get('general.date_format'), $article['pub_date']); ?>
	</small>
</p>

<?php echo NiceString::makeNice($article['content'], 3, true); ?>

<dl>
	<dt><?php echo Lang::get('tags'); ?></dt>
	<dd>
		<ul>
			<li><a href="#">jquery</a></li>
			<li><a href="#">news</a></li>
		</ul>
	</dd>
	<dt><?php echo Lang::get('comments'); ?></dt>
	<dd><a href="#">12 comments</a></dd>
</dl>