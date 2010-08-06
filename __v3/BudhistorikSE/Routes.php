<?php return array(
	'/kontor/'						=> 'Offices', 		# Every registered office
	'/kontor/:offices_id([0-9]+)/'	=> 'Office', 		# A specific office (with all its users and objects)
	'/objekt/'						=> 'Objects', 		# Every registered object (except inactive ones)
	'/objekt/:objects_id([0-9]+)/'	=> 'Object', 		# A specific object (with all its bids and its user)
	'/maklare/'						=> 'Users', 		# Every registered 'user' (real estate agent)
	'/maklare/:users_id([0-9]+)/'	=> 'User',			# A specific user (with its office and objects)

	# Admin
	'/konto/'							=> 'UserLogin', 		# The login-page for users
	'/konto/objekt/'					=> 'UserObjectsAdmin',	# The 'edit all objects'-page
	'/konto/objekt/:objects_id([0-9]+)'	=> 'UserObjectAdmin',	# The 'edit one object' page
	'/konto/objekt/nytt/'				=> 'AddUserObjectAdmin'	# The 'add an object'-page
); ?>
