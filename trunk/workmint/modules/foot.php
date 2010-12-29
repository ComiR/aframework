		</div>

		<script src="http://maps.google.com/maps/api/js?sensor=true"></script>
		<script src="<?php bloginfo('template_directory'); ?>/js/all.php"></script>
		<!--[if IE 6]>
			<script src="<?php bloginfo('template_directory'); ?>/js/DD_belatedPNG_0.0.8a-min.js"></script>
			<script src="<?php bloginfo('template_directory'); ?>/js/ie6.js"></script>
		<![endif]-->

		<?php if (isset($_GET['print'])) { ?>
			<script>
				window.print();
			</script>
		<?php } ?>

		<script type="text/javascript">
			var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
			document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
			try {
				var pageTracker = _gat._getTracker("UA-8422403-1");
				pageTracker._trackPageview();
			}
			catch (err) {
			}
		</script>

	</body>

</html>
<?php ob_end_flush(); ?>
