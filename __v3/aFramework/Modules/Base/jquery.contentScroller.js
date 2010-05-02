/***
@title:
Content Scroller

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2010-04-25

@url:
http://andreaslagerkvist.com/jquery/content-scroller/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2010 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.easing.js, jquery.scrollTo.js

@does:
Use this plug-in to make a list of elements only show one at a time and every now and then scroll to the next one. The plug-in scrolls in infinty, starting with the first after the last.

@howto:
jQuery('#recent-news ul').contentScroller(); would make the > li:s in #recent-news ul scroll.

@exampleHTML:
<ul>
	<li>Content 1</li>
	<li>Content 2<br/>On two lines</li>
	<li>Content 3</li>
</ul>

@exampleJS:
jQuery('#jquery-content-scroller-example ul').contentScroller();
***/
(function ($) {
	$.fn.contentScroller = function (conf) {
		var config = $.extend({
			itemSelector:	'> li', 
			pause:			7500, 
			duration:		1000, 
			easing:			'easeOutQuad', 
			className:		'jquery-content-scroller'
		}, conf);

		return this.each(function () {
			var pos				= 0;
			var itemsList		= $(this);
			var items			= itemsList.find(config.itemSelector);
			var scrollContainer	= itemsList
									.wrap('<div class="' + config.className + '"/>')
									.parent()
									.scrollTo('0', {axis: 'y'})
									.css({height: items.eq(0).outerHeight() + 'px', overflow: 'hidden'});

			// Add first item to end of list as well so that we can scroll in a loop
			$('<li>' + items.eq(0).html() + '</li>').appendTo(itemsList);

				items			= itemsList.find('> li');
			var numItems		= items.length;

			setInterval(function () {
				pos++;
				var afterScroll = function () {};

				// We're scrolling to the last item
				if (pos == numItems - 1) {
					afterScroll = function () {
						scrollContainer.scrollTo('0', {axis: 'y'});
						pos = 0;
					};
				}

				scrollContainer.scrollTo(items.eq(pos), {
					axis:		'y', 
					duration:	config.duration, 
					easing:		config.easing, 
					onAfter:	afterScroll
				}).css('height', items.eq(pos).outerHeight() + 'px');
			}, config.pause);
		});
	};
})(jQuery);
