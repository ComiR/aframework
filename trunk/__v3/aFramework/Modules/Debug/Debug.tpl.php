<div id="debug">

	<h2>aFramework Debug <span>- Debugging <?php echo $controller['site'] .'_' .$controller['name']; ?></span></h2>

	<div id="debug-inner">

		<p><?php echo str_replace(ROOT_DIR, '', $controller['path']); ?></p>

		<?php if(isset($__old)) { ?>
			<p><strong>This controller was forced by module <?php echo $__old['controller']['forced_by']; ?> in old controller <?php echo $__old['controller']['name']; ?></strong></p>
		<?php } ?>

		<dl>
			<dt>Run time</dt>
			<dd><?php echo $controller['run_time']; ?> sec(s)</dd>
			<dt>Num queries</dt>
			<dd><?php echo $controller['num_queries']; ?></dd>
		</dl>

		<?php if(count($_GET)) { ?>
			<h3>GET-data</h3>

			<dl>
				<?php foreach($_GET as $k => $v) { ?>
					<dt><?php echo $k; ?></dt>
					<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
				<?php } ?>
			</dl>
		<?php } ?>

		<?php if(count($_POST)) { ?>
			<h3>POST-data</h3>

			<dl>
				<?php foreach($_POST as $k => $v) { ?>
					<dt><?php echo $k; ?></dt>
					<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
				<?php } ?>
			</dl>
		<?php } ?>

		<?php if(count($_SESSION)) { ?>
			<h3>SESSION-data</h3>

			<dl>
				<?php foreach($_SESSION as $k => $v) { ?>
					<dt><?php echo $k; ?></dt>
					<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
				<?php } ?>
			</dl>
		<?php } ?>

		<?php if(count($_COOKIE)) { ?>
			<h3>COOKIE-data</h3>

			<dl>
				<?php foreach($_COOKIE as $k => $v) { ?>
					<dt><?php echo $k; ?></dt>
					<dd><?php echo $v != '' ? $v : '[empty]'; ?></dd>
				<?php } ?>
			</dl>
		<?php } ?>

		<h3>Modules</h3>

		<ul>
			<?php foreach($modules as $mod) { ?>
				<li id="module-<?php echo $mod['html_id']; ?>">
					<h4><?php echo $mod['site'] ? $mod['site'] : '[NoClass]'; echo '_' .$mod['name']; ?></h4>

					<p><?php echo isset($mod['path']) ? str_replace(ROOT_DIR, '', $mod['path']) : '[no module-class]'; ?></p>

					<dl>
						<dt>Run time</dt>
						<dd><?php echo $mod['run_time'] ? $mod['run_time'] : '[no run]'; ?> sec(s)</dd>
						<dt>Number of queries</dt>
						<dd><?php echo $mod['num_queries'] ? $mod['num_queries'] : '[none]'; ?></dd>
						<!--
							<dt>View</dt>
							<dd><?php echo $mod['tpl_file'] ? $mod['tpl_file'] === true ? '[yes]' : $mod['tpl_file'] : '[no]'; ?></dd>
							<dt>Force controller</dt>
							<dd><?php echo $mod['force_controller'] ? $mod['force_controller'] : '[no]'; ?></dd>
						-->
						<dt>Template paths</dt>
						<dd>
							<?php if(count($mod['tpl_paths'])) { ?>
								<dl>
									<?php foreach($mod['tpl_paths'] as $k => $v) { ?>
										<dt><?php echo ucfirst($k); ?></dt>
										<dd><?php echo $v != '' ? str_replace(ROOT_DIR, '', $v) : '[empty]'; ?></dd>
									<?php } ?>
								</dl>
							<?php } else { ?>
								[none]
							<?php } ?>
						</dd>
						<dt>Template variables</dt>
						<dd>
							<?php if(count($mod['tpl_vars'])) { ?>
								<dl>
									<?php foreach($mod['tpl_vars'] as $k => $v) { ?>
										<dt><?php echo $k; ?></dt>
										<dd>
											<?php 
												if(is_array($v)) {
													echo '<pre>';
													var_dump($v);
													echo '</pre>';
												}
												else {
													echo $v != '' ? $v : '[empty]';
												}
											?>
										</dd>
									<?php } ?>
								</dl>
							<?php } else { ?>
								[none]
							<?php } ?>
						</dd>
					</dl>
				</li>
			<?php } ?>
		</ul>

	</div>

</div>

<script type="text/javascript">
	Debug = {
		run: function() {
			this.addLinks('h2', function(a) {
				var debug = document.getElementById('debug');
				if(debug.className == 'hide') {
					debug.className = '';
				}
				else {
					debug.className = 'hide';
				}
			});

			this.addLinks('h3', function(a) {
				if(a.parentNode.className == 'hide') {
					a.parentNode.className = '';
				}
				else {
					a.parentNode.className = 'hide';
				}
			});

			this.addLinks('h4', function(a) {
				if(a.parentNode.parentNode.className == 'hide') {
					a.parentNode.parentNode.className = '';
				}
				else {
					a.parentNode.parentNode.className = 'hide';
				}
			});

			this.addModuleHighlighting();
		}, 

		addLinks: function(el, oc) {
			var div	= document.getElementById('debug');
			var h	= div.getElementsByTagName(el);

			for(var i = 0; h[i]; i++) {
				var a			= document.createElement('a');

				a.href			= '#';
				a.onclick		= function() {oc(this); return false;};
				a.innerHTML		= h[i].innerHTML;
				h[i].innerHTML	= '';

				h[i].appendChild(a);

				oc(a);
			}
		}, 

		addModuleHighlighting: function() {
			var div	= document.getElementById('debug');
			var lis = div.getElementsByTagName('li');

			for(var i = 0; lis[i]; i++) {
				var li		= lis[i];

				if(document.getElementById(li.id.replace(/^module-/, ''))) {
					li.onmouseover = function() {						
						var modID	= this.id.replace(/^module-/, '');
						var mod		= document.getElementById(modID);

						mod.style.opacity = .2;
					};

					li.onmouseout = function() {						
						var modID	= this.id.replace(/^module-/, '');
						var mod		= document.getElementById(modID);

						mod.style.opacity = 1;
					};
				}
			}
		}
	};

	Debug.run();
</script>