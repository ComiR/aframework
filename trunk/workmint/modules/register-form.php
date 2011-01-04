<?php
	$months = array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
?>

<div id="register-form">

	<form method="post" action="/register/">

		<div class="first">

			<p class="first-name">
				<label>
					<span class="label">First Name:</span> 
					<strong class="req">*</strong> 
					<span class="field"><input type="text" name="firstName"/></span>
				</label>
			</p>

			<p class="last-name">
				<label>
					<span class="label">Last Name:</span> 
					<strong class="req">*</strong> 
					<span class="field"><input type="text" name="lastName"/></span>
				</label>
			</p>

			<p class="dob">
				<span class="label">Birthdate:</span> 
				<strong class="req">*</strong> 
				<span class="fields">
					<select name="year">
						<option value="-1">Year</option>
						<?php for ($i = 1990; $i > 1939; $i--) { ?>
							<option value="<?php echo $i; ?>"><?php echo $i; ?></option>
						<?php } ?>
					</select> 
					<select name="month">
						<option value="-1">Month</option>
						<?php for ($i = 0; $i < 12; $i++) { ?>
							<option value="<?php echo $i; ?>"><?php echo $months[$i]; ?></option>
						<?php } ?>
					</select> 
					<select name="day">
						<option value="-1">Day</option>
						<?php for ($i = 0; $i < 31; $i++) { ?>
							<option value="<?php echo $i; ?>"><?php echo strlen(($i + 1)) == 1 ? '0' . ($i + 1) : ($i + 1); ?></option>
						<?php } ?>
					</select>
				</span>
			</p>

			<p class="gender">
				<label>
					<span class="label">Gender:</span> 
					<strong class="req">*</strong> 
					<span class="fields">
						<select name="gender">
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</span>
				</label>
			</p>

		</div>

		<div class="last">

			<p class="password">
				<label>
					<span class="label">Password:</span> 
					<strong class="req">*</strong> 
					<span class="field"><input type="password" name="password"/></span>
				</label>
			</p>

			<p class="password-again">
				<label>
					<span class="label">Password:<br/><small>(again)</small></span> 
					<strong class="req">*</strong> 
					<span class="field"><input type="password" name="passwordRepeat"/></span>
				</label>
			</p>

			<p class="email">
				<label>
					<span class="label">Email:</span> 
					<strong class="req">*</strong> 
					<span class="field"><input type="text" name="email"/></span>
				</label>
			</p>

			<?php
				$terms = get_page($id = 16);
				$terms = trim(strip_tags(preg_replace('/<h2>.*?<\/h2>/', '', $terms->post_content)));
			?>
			<p class="terms">
				<span class="label">Terms of Service:<br/><small><a href="<?php echo get_page_link(16); ?>?print">Printable version</a></small></span> 
				<strong class="req">*</strong> 
				<span class="terms"><textarea rows="10" cols="50" readonly="readonly"><?php echo $terms; ?></textarea></span><br/>
				<small class="terms-info">By clicking on "Create my account" you are agreeing to the <a href="<?php echo get_page_link(16); ?>">Terms of Service</a> above and the <a href="<?php echo get_page_link(14); ?>">Privacy Policy</a></small>
			</p>

		</div>

		<p class="submit">
			<input type="hidden" name="registerSubmit" value="1"/>
			<input type="submit" value="Create my account"/>
		</p>

	</form>

</div>
