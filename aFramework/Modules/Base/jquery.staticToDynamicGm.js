/***
@title:
Static to Dynamic Google Map

@version:
0.1

@author:
Andreas Lagerkvist

@date:
2011-01-04

@url:
http://andreaslagerkvist.com/jquery/static-to-dynamic-gm/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2011 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This plug-in turns a static google map into a dynamic one by inspecting the attributes passed to the static map API. It's still in beta and doesn't support everything you can pass to the static map API. Note that the plug-in obviously require you include the google maps api before running it. Since I'm not doing that on my site the example is just a static map.

@howto:
jQuery(document.body).staticToDynamicGM(); would turn every static map in the document into a dynamic one.

@exampleHTML:
<img src="http://maps.google.com/maps/api/staticmap?center=59.33961,18.080712&amp;zoom=15&amp;size=440x200&amp;sensor=false&amp;markers=59.33961,18.080712" alt="" />

@exampleJS:
jQuery('#jquery-static-to-dynamic-gm').staticToDynamicGM();
***/
(function ($) {
	$.fn.staticToDynamicGM = function (conf) {
		// Config
		var config = $.extend({
			mapURL:		'http://maps.google.com/maps/api/staticmap', 
			className:	'jquery-static-to-dynamic-gm'
		}, conf);

		// Make sure Google Maps API is included
		if (typeof(google) == 'undefined' || typeof(google.maps) == 'undefined') {
			return this;
		}

		// Be nice
		return this.each(function () {
			// Find all static google map images and turn them into JS maps
			$(this).find('img[src^="' + config.mapURL + '"]').each(function () {
				var img		= $(this);
				var attrs	= img.attr('src').split('?');
				var opts	= {
					zoom:		8, 
					center:		new google.maps.LatLng(-34.397, 150.644), 
					mapTypeId:	google.maps.MapTypeId.ROADMAP
				};

				// Make sure map has some attributes
				if (attrs.length > 1) {
					attrs = attrs[1].split('&');

					// Go through each attribute
					for (var i in attrs) {
						var attr = attrs[i].split('=');

						// Center needs to be an instance of LatLng
						if (attr[0] == 'center') {
							var latLng = attr[1].split(',');

							attr[1] = new google.maps.LatLng(latLng[0], latLng[1]);
						}
						// Size will be used for the size of the div
						else if (attr[0] == 'size') {
							var widthHeight = attr[1].split('x');

							attr[1] = {
								width:	widthHeight[0], 
								height:	widthHeight[1]
							};
						}
						// Convert zoom level to int
						else if (attr[0] == 'zoom') {
							attr[1] = parseInt(attr[1], 10);
						}
						// Markers need special treatment
						else if (attr[0] == 'markers') {
							var markers = attr[1].split('|');

							attr[1] = [];

							for (var j in markers) {
								var markerLatLng = markers[j].split(',');

								attr[1].push(new google.maps.LatLng(markerLatLng[0], markerLatLng[1]));
							}
						}

						opts[attr[0]] = attr[1];
					}

					// Now we have all the data we need to create the map
					var mapDiv	= $('<div class="' + config.className + '" style="width: ' + opts.size.width + 'px; height: ' + opts.size.height + 'px;"></div>').insertAfter(img.hide());
					var map		= new google.maps.Map(mapDiv[0], opts);

					// Now place potential markers
					if (typeof(opts.markers) != 'undefined') {
						for (var i in opts.markers) {
							new google.maps.Marker({
								position:	opts.markers[j], 
								map:		map
							});
						}
					}
				}
			});
		});
	};
})(jQuery);
