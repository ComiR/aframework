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
		<?php echo Lang::get('no_comments_yet_why_not'); ?> 
		<a href="#post-comment">
			<?php echo Lang::get('be_the_first_to_post_one'); ?>
		</a>
	</p>
<?php } ?>