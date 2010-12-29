<div id="post-comment">

	<!-- #respond is required by (sucky) WP -->
	<h3 id="respond"><?php comment_form_title('Leave a Reply', 'Leave a Reply to %s'); ?></h3>

	<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
		<p>You must be <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php echo urlencode(get_permalink()); ?>">logged in</a> to post a comment.</p>
	<?php else : ?>
		<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post">

			<?php if ( $user_ID ) : ?>
				<p>Logged in as <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>. <a href="<?php echo wp_logout_url(get_permalink()); ?>" title="Log out of this account">Log out &raquo;</a></p>
			<?php else : ?>
				<p>
					<label>
						Name <?php if ($req) echo "(required)"; ?><br />
						<input type="text" name="author" value="<?php echo $comment_author; ?>" />
					</label>
				</p>

				<p>
					<label>
						Email <?php if ($req) echo "(required)"; ?><br />
						<input type="text" name="email" value="<?php echo $comment_author_email; ?>" />
					</label>
				</p>

				<p>
					<label>
						Website <?php if ($req) echo "(required)"; ?><br />
						<input type="text" name="url" value="<?php echo $comment_author_url; ?>" />
					</label>
				</p>
			<?php endif; ?>

			<p class="comment">
				<label>
					Comment<br/>
					<textarea name="comment" cols="60" rows="10"></textarea>
				</label>
			</p>

			<p class="submit">
				<?php comment_id_fields(); ?>
				<?php do_action('comment_form', $post->ID); ?>
				<input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />
				<input name="submit" type="submit" value="Post comment" />
			</p>

		</form>
	<?php endif; ?>

</div>
