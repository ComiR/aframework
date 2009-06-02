/***
@title:
Super Simple Tabs

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2009-06-01

@url:
http://andreaslagerkvist.com/jquery/super-simple-tabs/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This is an extremely basic tabs-plugin which allows you to create tabbed content from the ever-so-common list of in-page-links. Atm the plug-in takes no configuration and simply hides/shows the content the links are pointing to as the user clicks.

@howto:
jQuery('ul.tabs').superSimpleTabs(); would make every ul with the class 'tabs' hide show the content its links are pointing to.

@exampleHTML:
<ul>
	<li><a href="#jquery-super-simple-tabs-example-1">Content 1</a></li>
	<li><a href="#jquery-super-simple-tabs-example-2">Content 2</a></li>
	<li><a href="#jquery-super-simple-tabs-example-3">Content 3</a></li>
</ul>
<div id="jquery-super-simple-tabs-example-1">
	Content 1
</div>
<div id="jquery-super-simple-tabs-example-2">
	Content 2
</div>
<div id="jquery-super-simple-tabs-example-3">
	Content 3
</div>

@exampleJS:
jQuery('#jquery-super-simple-tabs-example ul').superSimpleTabs();
***/
jQuery.fn.superSimpleTabs = function () {
	return this.each(function () {
		var ul = jQuery(this);

		// Go through all the in-page links in the ul
		ul.find('a[href^=#]').each(function (i) {
			var link = jQuery(this);

			// Hide all containers cept the first
			if (i) {
				jQuery(link.attr('href')).hide();
			}
			else {
				link.addClass('selected');
			}

			// When clicking link
			link.click(function () {
				// Hide selected link's containers
				jQuery(ul.find('a.selected').removeClass('selected').attr('href')).hide();

				// Show this one's
				jQuery(link.addClass('selected').attr('href')).show();

				return false;
			});
		});
	});
};