<ol<?php if ( $start > 1 ) { ?> start="<?php $start; ?>"<?php } ?>>
	<?php foreach ( $comments as $c ) { ?>
		<li>
			<h3>
				<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $c['gravatar_id']; ?>" alt="" /> 
				<a href="<?php echo Router::urlFor('Article', $c['article']); ?>#comment-<?php echo $c['comments_id']; ?>">
					<?php echo htmlentities($c['author']); ?>
				</a> <?php echo Lang::get('on'); ?> 
				<a href="<?php echo Router::urlFor('Article', $c['article']); ?>">
					<?php echo htmlentities($c['article']['title']); ?>
				</a>
			</h3>

			<?php echo NiceString::makeNice($c['content'], 4, 100); ?>

			<?php if ( ADMIN ) { ?>
				<form method="post" action="">
					<p>
						<input type="hidden" name="recent_comments_delete" value="1" />
						<input type="hidden" name="comments_id" value="<?php echo $c['comments_id']; ?>" />
						<input type="submit" value="<?php echo Lang::get('delete'); ?>" />
					</p>
				</form>
			<?php } ?>
		</li>
	<?php } ?>
</ol>

<ul>
	<li>
		<?php if ( $prev === false ) { ?>
			<?php echo Lang::get('newer'); ?>
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $prev; ?>"><?php echo Lang::get('newer'); ?></a>
		<?php } ?>
	</li>
	<li>
		<?php if ( $next === false ) { ?>
			<?php echo Lang::get('older'); ?>
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $next; ?>"><?php echo Lang::get('older'); ?></a>
		<?php } ?>
	</li>
</ul>