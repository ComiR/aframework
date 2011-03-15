<h2>aFramework Users</h2>

<div>
	<ul>
		<?php foreach ($users as $user) { ?>
			<li>
				<h3>
					<a href="<?php echo $user['url']; ?>">
						<?php echo escHTML($user['title']); ?>
					</a>
				</h3>

				<p>
					<a href="<?php echo $user['thumb']; ?>">
						<img src="<?php echo $user['thumb']; ?>" alt=""/>
					</a>
				</p>

				<?php echo NiceString::makeNice($user['description'], 4); ?>
			</li>
		<?php } ?>
	</ul>
</div>
