jQuery.fn.appleMenu = function() {
	return this.each(function() {
		jQuery(this).find('> div').each(function() {
			var div = jQuery(this);
			var heading = jQuery(this).find('> h2:first-child');
			var headingHeight = heading.outerHeight() + parseInt(heading.css('marginTop'), 10) + parseInt(heading.css('marginBottom'), 10);
			var divHeight = div.innerHeight();
			var divPadding = {
				top: div.css('paddingTop'), 
				bottom: div.css('paddingBottom')
			};
			div.css({overflow: 'hidden'});
			div.animate({height: headingHeight, paddingTop: 0, paddingBottom: 0});
			div.mouseover(function() {
				jQuery(this).animate({height: divHeight, paddingTop: divPadding.top, paddingBottom: divPadding.bottom});
			});
		});
	});
};