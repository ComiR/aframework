<h2>Administrera dina objekt</h2>

<p>Här kan du administrera alla dina objekt. Klicka på ett objekt för att få en detaljerad vy.</p>

<p><a href="<?php echo Router::urlFor('AddUserObjectAdmin'); ?>">Lägg till ett objekt</a></p>

<table>
	<tr>
		<th>ID</th>
		<th>Adress</th>
		<th>Högsta bud</th>
		<th>Bud</th>
		<th>Såld</th>
		<th>Redigera</th>
	</tr>
	<?php foreach ($objects as $object) { ?>
		<tr>
			<td>
				<?php echo $object['objects_id']; ?>
			</td>
			<td>
				<a href="<?php echo Router::urlFor('UserObjectAdmin', $object); ?>">
					<?php echo escHTML($object['address']); ?>, <?php echo escHTML($object['city']); ?>
				</a>
			</td>
			<td>
				<?php 
					if (!$object['highest_bid']) {
						echo "Inga bud";
					}
					else {
						echo number_format($object['highest_bid']['amount'], 0, ',', ' ') . ' SEK<br/>';
						echo $object['highest_bid']['first_name'] . ' ' . $object['highest_bid']['last_name'];
					}
				?>
			</td>
			<td>
				<a href="<?php echo Router::urlFor('UserObjectAdmin', $object); ?>#object-bids-admin">
					Registrera nytt bud
				</a>
			</td>
			<td>
				<form method="post" action="">
					<p>
						<input type="hidden" name="objects_id" value="<?php echo $object['objects_id']; ?>"/>
						<input type="hidden" name="toggle_sold" value="1"/>
						<input type="submit" value="<?php echo $object['sold'] ? 'Osåld' : 'Såld'; ?>"/>
					</p>
				</form>
			</td>
			<td>
				<a href="<?php echo Router::urlFor('UserObjectAdmin', $object); ?>">
					Redigera objekt
				</a>
			</td>
		</tr>
	<?php } ?>
</table>

<p><a href="<?php echo Router::urlFor('AddUserObjectAdmin'); ?>">Lägg till ett objekt</a></p>
