<?php $observational = 0; for ($what = 0; $what < 2; $what++) { ?>
	<?php if ($what and $observational) { ?>
		<h3><?php echo Lang::get('Observational Partners'); ?></h3>
	<?php } elseif (!$what and $title) { ?>
		<h3><?php echo htmlentities($title); ?></h3>
	<?php } ?>

	<ul>
		<?php foreach ($persons as $person) { ?>
			<?php if ($person['observational'] == $what) { ?>
				<li>
					<h4><?php echo htmlentities($person['country']); ?></h4>

					<img src="<?php echo Router::urlForFile('people/' . strtolower(preg_replace('/[^a-zA-Z0-9\-_]*/', '', $person['name']))); ?>.jpg" alt=""/>

					<h5><?php echo htmlentities($person['name']); ?></h5>

					<p><?php echo htmlentities($person['title']); ?></p>

					<dl>
						<dt><?php echo Lang::get('Telephone'); ?></dt>
						<dd><?php echo $person['tel']; ?></dd>
						<dt><?php echo Lang::get('E-mail'); ?></dt>
						<dd>
							<a href="mailto:<?php echo $person['email']; ?>">
								<?php echo $person['email']; ?>
							</a>
						</dd>
					</dl>
				</li>
			<?php } else { $observational++; } ?>
		<?php } ?>
	</ul>
<?php } ?>
