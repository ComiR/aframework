<ul>
	<li><?php if($prev === false) { ?>Newer<?php } else { ?><a href="?post_it_start=<?php echo $prev; ?>">Newer</a><?php } ?></li>
	<li><?php if($next === false) { ?>Older<?php } else { ?><a href="?post_it_start=<?php echo $next; ?>">Older</a><?php } ?></li>
</ul>

<?php if(ADMIN) { ?>
	<form method="post" action="">

		<p>
			<label>
				Say this<br />
				<input type="text" name="post_it_text" size="25" />
			</label> <input type="submit" value="Post It!" />
		</p>
	
	</form>
<?php } ?>