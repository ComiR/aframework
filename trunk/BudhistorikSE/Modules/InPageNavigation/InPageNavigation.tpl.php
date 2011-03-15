<?php if (isset(Router::$params['objects_id'])) { ?>
	<ul>
		<li><a href="#wrapper">Start</a></li>
		<li><a href="#object-user">Mäklare</a></li>
		<li><a href="#object-bids">Budhistorik</a></li>
	</ul>
<?php } elseif (isset(Router::$params['offices_id'])) { ?>
	<ul>
		<li><a href="#wrapper">Start</a></li>
		<li><a href="#office-users">Mäklare</a></li>
		<li><a href="#office-objects">Objekt</a></li>
	</ul>
<?php } elseif (isset(Router::$params['users_id'])) { ?>
	<ul>
		<li><a href="#wrapper">Start</a></li>
		<li><a href="#user-office">Kontor</a></li>
		<li><a href="#user-objects">Objekt</a></li>
	</ul>
<?php } else { ?>
	<ul>
		<li><a href="#wrapper">Start</a></li>
		<li><a href="#page">Om oss</a></li>
		<li><a href="#contact">Kontakt</a></li>
	</ul>
<?php } ?>