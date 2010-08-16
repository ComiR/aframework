<h3>Budhistorik</h3>

<?php if ($bids) { ?>
	<table>
		<tr>
			<th>Datum</th>
			<th>Värde</th>
			<th>Budgivare</th>
			<th>Telefon</th>
			<th>Personnummer</th>
			<th>Aktivt</th>
		</tr>
		<?php $bestBid = true; foreach ($bids as $bid) { ?>
			<tr>
				<td><?php echo date(Config::get('general.date_format'), strtotime($bid['pub_date'])); ?></td>
				<td><?php echo number_format($bid['amount'], 0, ',', ' '); ?> SEK</td>
				<td><?php echo $bid['first_name'] . ' ' . $bid['last_name']; ?></td>
				<td><?php echo $bid['phone']; ?></td>
				<td><?php echo $bid['id_number']; ?></td>
				<td>
					<form method="post" action="">
						<p>
							<input type="hidden" name="bids_id" value="<?php echo $bid['bids_id']; ?>"/>
							<input type="hidden" name="toggle_active" value="1"/>
							<input type="submit" value="<?php echo $bid['active'] ? 'Tillbakadraget' : 'Aktivterat'; ?>"/>
							<?php /* if ($bestBid && $bid['active']) { $bestBid = false; ?>
								<input type="submit" value="accepterat"/>
							<?php } */ ?>
						</p>
					</form>
				</td>
			</tr>
		<?php } ?>
	</table>
<?php } else { ?>
	<p>Inga bud.</p>
<?php } ?>

<h3>Lägg till ett bud</h3>

<?php echo $form_html; ?>
