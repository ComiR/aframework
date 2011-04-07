/***
@title:
View More

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2011-04-07

@url:
http://andreaslagerkvist.com/jquery/view-more/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2011 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This plug-in allows an element's contents to be hidden untill the user clicks a certain element. It works exactly like the HTML5 details and summary elements only you can run it on any element.

@howto:
Run the plug-in on the element that should be collapsed, tell it which (child) element to click in order to expand all elements.

@exampleHTML:
<ul>
	<li><h2>Item 1</h2><p>Content 1</p></li>
	<li><h2>Item 2</h2><p>Content 2</p></li>
	<li><h2>Item 3</h2><p>Content 3</p></li>
	<li><h2>Item 4</h2><p>Content 4</p></li>
</ul>

@exampleJS:
jQuery('#jquery-view-more-example li').viewMore({toggler: 'h2'});
***/
(function ($) {
	$.fn.viewMore = function (conf) {
		var config = $.extend({
			jqClass:		'jquery-view-more', 
			toggler:		'summary', 
			openClass:		'open', 
			closeClass:		'', 
			openCallback:	function () {}, 
			closeCallback:	function () {}, 
			bothCallback:	function () {}, 
			open:			false // true (all open) / false (none open) / int (specific one open)
		}, conf);

		return this.each(function (i) {
			var wrapper = $(this).addClass(config.jqClass);
			var toggler = wrapper.find(config.toggler).eq(0).addClass(config.jqClass + '-toggler').wrapInner('<a href="#"></a>');

			if (config.open) {
				if (isNaN(parseInt(config.open, 10))) {
					wrapper.addClass(config.openClass);
				}
				else if ((i + 1) == parseInt(config.open, 10)) {
					wrapper.addClass(config.openClass);
				}
			}

			toggler.click(function () {
				if (wrapper.is('.' + config.openClass)) {
					wrapper.removeClass(config.openClass).addClass(config.closeClass);

					config.closeCallback(wrapper);
					config.bothCallback(wrapper);
				}
				else {
					wrapper.removeClass(config.closeClass).addClass(config.openClass);

					config.openCallback(wrapper);
					config.bothCallback(wrapper);
				}

				return false;
			});
		});
	};
})(jQuery);
