<?php if ($comments) { ?>
	<ol>
		<?php foreach ($comments as $c) { ?>
			<li id="comment-<?php echo $c['comments_id']; ?>">
				<h4>
					<img src="http://www.gravatar.com/avatar.php?gravatar_id=<?php echo $c['email_md5']; ?>" alt="" /> 
					<a href="<?php echo Router::urlFor('Article', $c); ?>#comment-<?php echo $c['comments_id']; ?>">
						<?php echo htmlentities($c['author']); ?>
					</a>
				</h4>

				<p>
					<small>
						<?php echo Lang::get('Published'); ?> 
						<?php echo date(Config::get('general.date_format'), strtotime($c['pub_date'])); ?>
					</small>
				</p>

				<?php echo NiceString::makeNice($c['content'], 5); ?>
			</li>
		<?php } ?>
	</ol>
<?php } else { ?>
	<p>
		<?php echo Lang::get('No comments yet, why not'); ?> 
		<a href="#post-comment">
			<?php echo Lang::get('be the first to post one'); ?>
		</a>?
	</p>
<?php } ?>