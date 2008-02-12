// Is there a better way of doing this?
jQuery.plugInToolTipMouseTrack = {
	x: 0, 
	y: 0
};
jQuery('body').mousemove(function(e) {
	jQuery.plugInToolTipMouseTrack.x = e.pageX;
	jQuery.plugInToolTipMouseTrack.y = e.pageY;
});

jQuery.fn.toolTip = function(conf) {
	// Some constants
	var CENTER = 'center', 
		MOUSE = 'mouse', 
		TRACK = 'track';

	// config for plugin
	var config = {
		id: 'tool-tip', 	// ID of div
		className: false, 	// Class of div
		on: 'mouseover', 	// Display the tool-tip on this event
		off: 'mouseout', 	// Hide the tool-tip on this event
		html: false, 		// Display this HTML in the tool-tip (string (html) or function that returns HTML, the element clicked (or whatever) will be passed to the function)
		ajax: false, 		// Display result from ajax-get-call to this url in the tool-tip (string (url) or function that returns HTML, the element clicked (or whatever) will be passed to the function)
		attr: false, 		// Display this attribute's value in the tool-tip
		position: MOUSE,  	// mouse, track or center (if center-plugin available)
		show: 'show', 		// Show-animation for tool-tip
		hide: 'hide', 		// Hide-animation for tool-tip
		speed: 0, 			// Animation-speed
		loadingText: 'Loading...'	// Any HTML fine (imgs whatever...)
	};
	config = jQuery.extend(config, conf);

	// Positions the tool-tip where the mouse is
	var trackMouse = function () {
		var x = jQuery.plugInToolTipMouseTrack.x + 5, 
 			y = jQuery.plugInToolTipMouseTrack.y + 10;

		jQuery('#' +config.id).css({zIndex: '10000', position: 'absolute', left: x +'px', top: y +'px'});
	};

	// Displays the tool-tip in right position
	var display = function(data) {
		jQuery('#' +config.id).html(data);

		if(config.position == CENTER) {
			var doThis = function() {
				jQuery('#' +config.id).center();
			};
		}
		else if(config.position == TRACK) {
			var doThis = function() {
				jQuery('body').bind('mousemove', trackMouse);
			};
		}
		else {
			var doThis = function() {
				trackMouse();
			};
		}

		// It doesn't fookin unbind in any browser?! What am I doing wrong???
		jQuery('body').unbind('mousemove', trackMouse);
		doThis();

		if(config.className) {
			jQuery('#' +config.id).attr('class', config.className);
		}

		jQuery('#' +config.id)[config.show](config.speed);
	};

	// Add tool-tip div if not added
	if(!jQuery('#' +config.id).length) {
		jQuery('<div id="' +config.id +'"></div>').appendTo('body').hide();
	}

	// Default to title
	if(!config.html && !config.ajax && !config.attr) {
		config.attr = 'title';
	}

	// Make sure center-plug-in exists if tool-tip is to be centered
	if(config.position == CENTER && !jQuery.fn.center) {
		config.position = MOUSE;
	}

	// Always return each...
	return this.each(function() {
		// On whatever event
		jQuery(this)[config.on](function() {
			// Display either html, ajax-result or attribute
			if(config.html) {
				var data = config.html;
				if(typeof(data) === 'function') {
					data = data($(this));
				}
				display(data);
			}
			else if(config.ajax) {
				var url = config.ajax;
				if(typeof(url) === 'function') {
					url = url($(this));
				}
				display(config.loadingText);
				jQuery.get(url, function(d) {
					$('#' +config.id).html(d);
				});
			}
			else if(config.attr) {
				display(jQuery(this).attr(config.attr));
			}
			return false;
		// Hide it on whatever other event
		})[config.off](function() {
			jQuery('#' +config.id)[config.hide](config.speed);
			return false;
		});
	});
};