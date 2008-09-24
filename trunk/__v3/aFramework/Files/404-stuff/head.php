<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

	<head>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

		<style type="text/css">
			html {
				background: #d4d0c8;

				margin: 0;
				padding: 0;

				font: 100%/1.2 Arial, sans-serif;
				color: #000;
			}

				body {
					background: #fff url(chrome://global/skin/icons/warning-large.png) no-repeat 30px 30px;

					width: 550px;

					margin: 40px auto;
					padding: 20px 30px 20px 100px;

					border: 1px solid threedshadow;

					-moz-border-radius: 10px;
					-webkit-border-radius: 10px;
					borde-radius: 10px;
				}

					h1, 
					h2, 
					h3 {
						margin: 20px 0 10px;
						font-size: 140%;
						border-bottom: 1px solid #ccc;
					}

					h2 {
						font-size: 120%;
					}

					h3 {
						font-size: 100%;
						border: 0;
					}

					p {
						margin: 0 0 5px;
					}

					body > p:last-child {
						padding: 10px 0 0 0;
						border-top: 1px solid #ccc;
					}

					ul, 
					ol {
						margin: 0 0 10px 30px;
						padding: 0;
					}

					a {
						color: blue;
						text-decoration: underline;
					}

					a:hover {
						color: red;
						text-decoration: underline;
					}

					small {
						font-size: 80%;
						color: #666;
					}

					form {
						margin: 0 0 10px;
						border-bottom: 1px solid #ccc;
					}

						form fieldset {
							margin: 0;
							padding: 0;
							border: 0;
						}

							form fieldset legend {
								margin: 0 0 5px;
								padding: 0;
								font-weight: bold;
							}
		</style>

		<title>Error: 404 - Page Not Found - <?php echo SITE_TITLE; ?></title>

	</head>

	<body>

		<h1>Error: 404 - Page Not Found</h1>

		<form method="get" action="<?php echo Router::urlFor('SearchResults'); ?>">

			<fieldset>

				<legend>Try a search</legend>

				<p>
					<label for="q">Search terms</label> <input type="text" name="q" id="q" /> <input type="submit" value="Find" />
				</p>

			</fieldset>

		</form>