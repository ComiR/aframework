<ol<?php if($start > 1) { ?> start="{$recent_comments.start}"<?php } ?>>
<?php for($i = 0; $i < 4; $i++) { ?>
	<li><img src="http://www.gravatar.com/avatar.php?gravatar_id={$recent_comment.gravatar_id}" alt="" /> <a href="{$recent_comment.url}" title="Permanent link to this comment">{$recent_comment.author}</a> on <a href="{$recent_comment.article_url}" title="Permanent link to this article">{$recent_comment.title}</a>:<br />{$recent_comment.comment}<?php if(ADMIN) { ?> <a href="?delete_comment={$recent_comment.comments_id}" title="Delete this comment">[Delete]</a><?php } ?></li>
<?php } ?>
</ol>

<ul>
	<li><?php if($prev === false) { ?>Newer<?php } else { ?><a href="?recent_comments_start={$recent_comments.prev}">Newer</a><?php } ?></li>
	<li><?php if($next === false) { ?>Older<?php } else { ?><a href="?recent_comments_start={$recent_comments.next}">Older</a><?php } ?></li>
</ul>