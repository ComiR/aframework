<h3>Budhistorik</h3>

<?php if ($bids) { ?>
	<ol>
		<?php foreach ($bids as $bid) { ?>
			<li>
				<?php echo number_format($bid['amount'], 0, ',', ' '); ?> SEK 
				<small><?php echo date(Config::get('general.date_format'), strtotime($bid['pub_date'])); ?></small> 
				<?php if (!$bid['active']) { ?>
					<strong>Tillbakadragen</strong>
				<?php } ?>
			</li>
		<?php } ?>
	</ol>
<?php } else { ?>
	<p>Inga bud!</p>
<?php } ?>