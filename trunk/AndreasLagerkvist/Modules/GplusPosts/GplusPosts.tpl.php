<?php foreach ($posts as $post) : ?>
	<h2>
		<a href="<?php echo $post->url ?>">
			<?php echo Lang::get('From G+ %0', array(date(Config::get('general.date_format'), strtotime($post->published)))) ?>
		</a>
	</h2>

	<p><?php echo str_replace('<br /><br />', '</p><p>', $post->object->content) ?></p>

	<?php if ($post->object->attachments) : ?>
		<?php foreach ($post->object->attachments as $att) : ?>
			<?php if ($att->objectType == 'video') : ?>
				<div class="video">
					<iframe src="<?php echo $att->embed->url ?>" width="560" height="315" frameborder="0" allowfullscreen></iframe>
				</div>
			<?php elseif ($att->objectType == 'photo') : ?>
				<div class="photo">
					<img src="<?php echo $att->fullImage->url ?>"/>
				</div>
			<?php else : ?>
				<strong>Unable to display attachment</strong>
			<?php endif ?>
		<?php endforeach ?>
	<?php endif ?>
<?php endforeach ?>
