<div id="comments">

	<h3><?php comments_number('No Responses', 'One Response', '% Responses' );?> to &#8220;<?php the_title(); ?>&#8221;</h3>

	<?php if (post_password_required()) : ?>
		<p>
			<strong>
				This post is password protected. Enter the password to view comments.
			</strong>
		</p>
	<?php else : ?>
		<?php if ($comments) : ?>
			<ol>
				<?php foreach ($comments as $comment) : ?>
					<li id="comment-<?php comment_ID() ?>">
						<h4>
							<?php echo get_avatar($comment, 32); ?> 
							<cite><?php comment_author_link() ?></cite> 
							says:
						</h4>

						<?php if ($comment->comment_approved == '0') : ?>
							<p><strong>Your comment is awaiting moderation...</strong></p>
						<?php endif; ?>

						<p>
							<small>
								<a href="#comment-<?php comment_ID() ?>">
									<?php comment_date() ?> at 
									<?php comment_time() ?>
								</a> <?php edit_comment_link('edit',' | ',''); ?>
							</small>
						</p>

						<?php comment_text() ?>
					</li>
				<?php endforeach; ?>
			</ol>
		<?php else : ?>
			<?php if ('open' == $post->comment_status) : ?>
				<p>No comments, why don't you <a href="#post-comment">post the first</a>?</p>
			<?php else : ?>
				<p><strong>Sorry, the comment form is closed at this time.</strong></p>
			<?php endif; ?>
		<?php endif; ?>
	<?php endif; ?>

</div>
