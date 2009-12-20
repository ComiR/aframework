/***
@title:
Pixastic Editor

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2009-04-18

@url:
http://andreaslagerkvist.com/jquery/pixastic-editor/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
This app/plug-in inserts a (completely stylable) toolbar next to any image in your document that allows the user to apply different [Pixastic](http://www.pixastic.com)-effects to the image.

The modified image can be opened in a new window by clicking it.

**I've recently stopped including pixastic on my site so I had to remove the example and downloads from this page. Instead, please have a look at the [external example page](/AndreasLagerkvist/Files/pixastic-editor/) and its source for what you need.**

@howto:
$('#my-image').pixasticEditor(); would insert the editor in the #my-image-element and affect an img-element within #my-image.

Since it's not possible to append a list or div or any other element directly to an image, the plug-in should be run on a parent-element (preferably div) of the img-element.  
If you have a list of images you could run it on each li of the list.

@exampleHTML:
<img src="/AndreasLagerkvist/Files/lamp-and-mates.jpg" alt="Lamp and Mates" />

@exampleJS:
// This is what the code could look like, since I no longer include pixastic.js on my site I've had to comment it
//$(function () {
//	var img = $('#jquery-pixastic-editor-example').find('img')[0];

//	if (img.complete) {
//		$('#jquery-pixastic-editor-example').pixasticEditor();
//	}
//	else {
//		img.onload = function () {
//			$('#jquery-pixastic-editor-example').pixasticEditor();
//		};
//	}
//});
***/
