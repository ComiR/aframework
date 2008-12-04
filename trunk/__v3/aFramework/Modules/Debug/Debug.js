aFramework.modules.Debug = {
	run: function() {
		if(jQuery('body.debug').length) {
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
		}
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
			if(document.getElementById(lis[i].title)) {
				lis[i].onmouseover = function() {
					document.getElementById(this.title).className = 'debug-module-highlight';
				};
				lis[i].onmouseout = function() {						
					document.getElementById(this.title).className = '';
				};
			}
		}
	}
};