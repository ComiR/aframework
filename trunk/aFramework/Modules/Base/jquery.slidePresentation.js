/***
@title:
Slide Presentation

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2010-03-20

@url:
http://andreaslagerkvist.com/jquery/slide-presentation/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2010 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.scrollTo.js, jquery.slidePresentation.css

@does:
A sort of slide/presentation kind of plug-in. Displays sliding images with text floating on top. This one's pretty specific but perhaps someone will find it useful.

@howto:
Each slide in the presentation should be in its own li. Inside the li there should be one image and one or more <p>aragraphs of text you want displayed on top of the image.

With the HTML in place simply run the plug-in on a container of the ul.

@exampleHTML:
<ul>
	<li>
		<img src="/aFrameworkCom/Files/guide/0-intro.png" alt=""/>
		<p>aFramework is an open source PHP web development framework.</p>
		<p>Regardless if you're creating something completely unique or just another blog - aFramework will help you do it quicker.</p>
	</li>
	<li>
		<img src="/aFrameworkCom/Files/guide/1-home.png" alt=""/>
		<p>A typical website built on aFramework.</p>
		<p>This one uses both aBlog and aCMS.</p>
	</li>
	<li>
		<img src="/aFrameworkCom/Files/guide/2-admin-home.png" alt=""/>
		<p>The same page logged in as admin.</p>
		<p>You can now edit and insert content.</p>
	</li>
</ul>

@exampleJS:
// Wait for images to load...
$(window).load(function () {
	$('#jquery-slide-presentation-example').slidePresentation();
});
***/
jQuery.fn.slidePresentation = function () {
	return this.each(function () {
		var container = $(this).scrollTo(0, {axis: 'y'}).addClass('jquery-slide-presentation');
		var scrollOverStep = function (num) {
			var guide			= container.addClass('scrolling-fast');
			var li				= guide.find('li').eq(num);
			var pointDuration	= 4000;
			var guideWidth		= guide.width();
			var guideHeight		= guide.height();

			if (!li.length) {
				li = guide.find('li').eq(num = 0);
			}

			guide.scrollTo(li, {
				axis: 'y', 
				duration: num ? 1000 : 0, 
				onAfter: function () {
					guide.removeClass('scrolling-fast');

					var img				= li.find('img');
					var imgHeight		= Math.round(img.height() * (guideWidth / img.width()));
					var scrollAmnt		= imgHeight - guideHeight;
					var points			= li.find('p');
					var numPoints		= points.length;
					var heightPerPt		= Math.round(scrollAmnt / numPoints);
					var guideDuration	= numPoints * pointDuration;

					// Move all points and "zoom in" the image
					points.css('top', (imgHeight + 300) + 'px');

					// Scroll in each point
					var i = 0;
					var scrollInPoint = function () {
						var pointTop = parseInt(i * heightPerPt + guideHeight / 2 + heightPerPt / 4, 10);

						points.eq(i).animate({top: pointTop + 'px'}, 500, 'noEasing', function () {
							var t = $(this);

							t.animate({top: parseInt(pointTop + heightPerPt / 2, 10) + 'px'}, pointDuration - 1000, 'noEasing', function () {
								t.animate({top: '-300px'}, 500);
							});
						});

						i++;
					};

					scrollInPoint();
					var pointsInterval = setInterval(scrollInPoint, pointDuration);

					// Zoom out the page
				//	img.animate({width: '940px'}, 3000, 'noEasing');

					// Scroll slowly over this step for 5 seconds * number of "points"
					guide.scrollTo('+=' + scrollAmnt, {
						axis:		'y', 
						duration:	guideDuration, 
						easing:		'noEasing', 
						onAfter:	function () {
							clearInterval(pointsInterval);
							scrollOverStep(++num);
						}
					});
				}
			});
		};

		scrollOverStep(0);
	});
};
