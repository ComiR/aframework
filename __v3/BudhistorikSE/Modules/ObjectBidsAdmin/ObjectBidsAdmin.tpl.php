<h3>Budhistorik</h3>

<?php if ($bids) { ?>
	<ol>
		<?php foreach ($bids as $bid) { ?>
			<li>
				<?php echo number_format($bid['amount'], 0, ',', ' '); ?> SEK 
				<small><?php echo date(Config::get('general.date_format'), strtotime($bid['pub_date'])); ?></small>

				<form method="post" action="">
					<p>
						<input type="hidden" name="bids_id" value="<?php echo $bid['bids_id']; ?>"/>
						<input type="hidden" name="toggle_active" value="1"/>
						<input type="submit" value="<?php echo $bid['active'] ? 'Markera som tillbakadraget' : 'Markera som aktivt'; ?>">
					</p>
				</form>
			</li>
		<?php } ?>
	</ol>
<?php } else { ?>
	<p>Inga bud.</p>
<?php } ?>

<h3>Lägg till ett bud</h3>

<?php echo $form_html; ?>