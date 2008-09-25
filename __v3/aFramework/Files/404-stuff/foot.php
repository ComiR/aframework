		<form method="get" action="<?php echo Router::urlFor('SearchResults'); ?>">

			<p>
				<label for="q">Try a different search</label> <input type="text" name="q" id="q" /> <input type="submit" value="Find" />
			</p>

		</form>
		
		<p><small>The request for <?php echo $_SERVER['REQUEST_URI']; ?> returned a 404 header, this could be either from a module forcing a 404-header or simply because the router couldn't match a route.</small></p>
	
	</body>

</html>