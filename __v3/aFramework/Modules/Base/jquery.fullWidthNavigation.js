/***
@title:
TODO: Full Width Navigation

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/full-width-navigation/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, dimensions

@does:
Makes any navigation built from the HTML-element ul, li and a take up the full width of the ul provided it's styled a certain way.

The plug-in accepts positive or negative margin-right on the li and any padding/broder on the li and a. Any other margin, padding or border will screw up the calculations.

@howto:
jQuery('#navigation ul').fullWidthNavigation(); Would make the li's in the #navigation ul take up all the ul's width.

@exampleHTML:
<ul>
	<li><a href="#">Home</a></li>
	<li><a href="#">About</a></li>
	<li><a href="#">Contact</a></li>
</ul>

@exampleJS:
jQuery('#jquery-full-width-navigation-example ul').fullWidthNavigation();
***/