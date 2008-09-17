/***
@title:
TODO: Image Box

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/image-box/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jQuery

@does:
Makes links pointing to images open in the "Image Box". The Image Box centers on screen and displays all the other images in the same scope beneath the currently displayed image.

@howto:
jQuery('#holiday-photos, #flickr-images').imgBox(); would create Image Box-albums from the two elements #holiday-photos and #flickr-images

@exampleHTML:
<ul>
	<li><a href="http://exscale.se/__files/3d/bloodcells.jpg">Bloodcells</a></li>
	<li><a href="http://exscale.se/__files/3d/x-wing.jpg">X-Wing</a></li>
	<li><a href="http://exscale.se/__files/3d/weve-moved.jpg">We've moved</a></li>
</ul>

<ul>
	<li><a href="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01.jpg"><img src="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01_small.jpg" alt="Lamp and Mates" /></a></li>
	<li><a href="http://exscale.se/__files/3d/stugan-winter.jpg"><img src="http://exscale.se/__files/3d/stugan-winter_small.jpg" alt="The Cottage - Winter time" /></a></li>
	<li><a href="http://exscale.se/__files/3d/ps2.jpg"><img src="http://exscale.se/__files/3d/ps2_small.jpg" alt="PS2" /></a></li>
</ul>

@exampleJS:
jQuery('#jquery-full-image-box-example ul:first-child, #jquery-full-image-box-example ul:last-child').imgBox();
***/