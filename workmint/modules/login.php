<div id="login">

	<h2><span>Have an account?</span> <a href="#login-form">Sign in</a></h2>

	<form method="post" action="/login/" id="login-form">

		<p class="username">
			<label>
				Username or email<br/>
				<input type="text" name="loginEmail"/>
			</label>
		</p>

		<p class="password">
			<label>
				Password<br/>
				<input type="password" name="loginPassword"/>
			</label>
		</p>

		<p class="submit">
			<input type="hidden" value="loginSubmit" value="1"/>
			<input type="submit" value="Login"/>
		</p>

		<ul>
			<li><a href="/Forgot/">Forgot password?</a></li>
		</ul>

	</form>

</div>
