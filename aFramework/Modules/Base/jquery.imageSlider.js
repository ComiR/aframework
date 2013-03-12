(function ($) {
	$.fn.imageSlider = function (action) {
		return this.each(function () {
			// This slider has not been initialized
			if (!$(this).is('.jquery-image-slider')) {
				var wrap	= $(this).html('').addClass('jquery-image-slider loading'); // Clear any potential "enable JS"-text
				var frames	= wrap.data('frames');
				var src		= wrap.data('src');

				// Append every frame to the wrapper
				for (var i = 0; i <= frames; i++) {
					// TODO: Remove this and make frames have numbering 0 - X, _not_ 00 - x
					var tmp = '' + i + '';
						tmp = tmp.length < 2 ? '0' + tmp : tmp;

					$('<img src="' + src.replace('[#frame]', tmp) + '">').hide().appendTo(wrap);
				}

				// The slider is what actually slides the images, but the slider can be triggered by touch events as well
				var slider = $('<input type="range" min="0" max="' + frames + '" value="0">').insertAfter(wrap);

				slider.change(function () {
					wrap.find('img').hide().eq($(this).val()).css('display', 'inline');
				});

				// Add touch events (http://www.netmagazine.com/tutorials/build-360-view-image-slider-javascript)
				var dragging	= false;
				var startPos	= 0;
				var increase	= Math.round((wrap.outerWidth() / 1.5) / frames); // / 1.5 so that it rotates a little quicker
				var startFrame	= 0;

				var getPointerEvent = function (e) {
					return e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0] : e;
				};

				// Updates the slider based on drag
				var updateSlider = function (newPos) {
					var diff			= newPos - startPos;
					var frameIncrease	= Math.ceil(diff / increase);
					var gotoFrame		= parseInt(startFrame, 10) + parseInt(frameIncrease, 10);

					if (gotoFrame < 0) {
						while (gotoFrame < 0) {
							gotoFrame += (frames + 1);
							gotoFrame = gotoFrame % (frames + 1);
						}
					}
					else if (gotoFrame > frames) {
						gotoFrame = gotoFrame % (frames + 1);
					}

					slider.val(gotoFrame).change();
				};

				// Mouse
				wrap.mousedown(function (e) {
					e.preventDefault();

					startFrame	= slider.val();
					startPos	= getPointerEvent(e).pageX;
					dragging	= true;
				});

				wrap.mousemove(function (e) {
					e.preventDefault();

					if (dragging) {
						updateSlider(getPointerEvent(e).pageX);
					}
				});

				wrap.mouseup(function (e) {
					e.preventDefault();

					dragging = false;
				});

				// Touch
				wrap.bind('touchstart', function (e) {
					e.preventDefault();

					startFrame	= slider.val();
					startPos	= getPointerEvent(e).pageX;
					dragging	= true;
				});

				wrap.bind('touchmove', function (e) {
					e.preventDefault();

					if (dragging) {
						updateSlider(getPointerEvent(e).pageX);
					}
				});

				wrap.bind('touchend', function (e) {
					e.preventDefault();

					dragging = false;
				});

				// Wait for all images to load
				wrap.find('img').batchImageLoad({
					loadingCompleteCallback: function () {
						wrap.removeClass('loading').find('img').eq(0).css('display', 'inline');

						if (typeof(action) == 'function') {
							action();
						}
					}
				});
			}
			// Slider has been initialized (but may not be loaded)
			else {
				var wrap	= $(this);
				var frames	= wrap.data('frames');
				var slider	= wrap.next('input');

				var onload = function () {
					if (action == 'slide') {
						if (wrap.data('slideInterval')) {
							clearInterval(wrap.data('slideInterval'));
						}

						var i = 0;

						wrap.data('slideInterval', setInterval(function () {
							slider.val(++i).change();

							if (i == frames) {
								clearInterval(wrap.data('slideInterval'));
								slider.val(0).change();
							}
						}, 20));
					}
				};

				var waitForLoad = function () {
					if (wrap.is('.loading')) {
						setTimeout(waitForLoad, 10);
					}
					else {
						onload();
					}
				};

				waitForLoad();
			}
		});
	};
})(jQuery);
