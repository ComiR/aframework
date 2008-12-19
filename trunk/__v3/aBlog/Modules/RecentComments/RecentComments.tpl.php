<ol<?php if($start > 1) { ?> start="<?php $start; ?>"<?php } ?>>
	<?php foreach($comments as $c) { ?>
		<li>
			<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $c['gravatar_id']; ?>" alt="" /> 
			<a href="<?php echo $c['url']; ?>" title="Permanent link to this comment"><?php echo $c['author']; ?></a> on 
			<a href="<?php echo $c['article_url']; ?>" title="Permanent link to this article"><?php echo $c['title']; ?></a>:<br />
			<?php echo $c['content_excerpt']; ?>
			<?php if(ADMIN) { ?>
				<br /><a href="?delete_comment=<?php echo $c['comments_id']; ?>" title="Delete this comment">[Delete]</a>
			<?php } ?>
		</li>
	<?php } ?>
</ol>

<ul>
	<li>
		<?php if($prev === false) { ?>
			Newer
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $prev; ?>">Newer</a>
		<?php } ?>
	</li>
	<li>
		<?php if($next === false) { ?>
			Older
		<?php } else { ?>
			<a href="?recent_comments_start=<?php echo $next; ?>">Older</a>
		<?php } ?>
	</li>
</ul>