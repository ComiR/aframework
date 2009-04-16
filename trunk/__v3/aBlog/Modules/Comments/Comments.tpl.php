<?php if ($comments) { ?>
	<ol>
		<?php foreach ($comments as $c) { ?>
			<li>
				<h4>
					<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $c['email_md5']; ?>" alt="" /> 
					<a href="<?php echo Router::urlFor('Article', $c); ?>#comment-<?php echo $c['comments_id']; ?>">
						<?php echo htmlentities($c['author']); ?>
					</a>
				</h4>

				<?php echo NiceString::makeNice($c['content'], 5); ?>
			</li>
		<?php } ?>
	</ol>
<?php } else { ?>
	<p>
		<?php echo Lang::get('No comments yet why not'); ?> 
		<a href="#post-comment">
			<?php echo Lang::get('Be the first to post one'); ?>
		</a>
	</p>
<?php } ?>