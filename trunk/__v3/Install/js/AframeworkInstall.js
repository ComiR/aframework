aFramework.modules.AframeworkInstall = {
	run: function() {
		this.addPrevNextButtons();
	}, 

	addPrevNextButtons: function() {
		var container	= $('#aframework-install').scrollTo(0, {axis: 'xy'});
		var buttons		= $('<div id="aframework-install-prev-next-buttons"><a href="#">Previous</a><a href="#">Next</a></div>').prependTo(document.body);
		var prev		= buttons.find('a').eq(0);
		var next		= buttons.find('a').eq(1);
		var currStep	= 0;
		var scrollOpts	= {
			axis:		'xy', 
			duration:	200, 
			easing:		'easeOutQuad'
		};

		var gotoStep = function(nStep, cStep) {
		//	alert('scrolling from ' +cStep +' to ' +nStep);
			var allSteps = container.find('fieldset');

			if(nStep >= 0 && nStep < allSteps.length) {
			//	var currStepHeight = allSteps.eq(cStep).outerHeight();
				var nextStepHeight = allSteps.eq(nStep).outerHeight();

			//	if(currStepHeight > nextStepHeight) {
			//		alert('scrolling 1');
			//		container.scrollTo(allSteps.eq(nStep), $.extend(scrollOpts, {onAfter: function() {
			//			alert('animating 1');
			//			container.animate({height: nextStepHeight +'px'}, 500);
			//		}}));
			//	}
			//	else {
			//		alert('animating 2');
					container.animate({height: nextStepHeight +'px'}, 500, function() {
			//			alert('scrolling 2');
						container.scrollTo(allSteps.eq(nStep), scrollOpts);
					});
			//	}

				return true;
			}

			return false;
		};

		container.css('height', 0);

		$('#wrapper-c').css('opacity', 1);

		setTimeout(function() {
			container.animate({height: container.find('fieldset').eq(0).outerHeight() +'px'}, 500, function() {
				buttons.animate({opacity: 1}, 500);
			})
		}, 2000);

		prev.click(function() {
			if(gotoStep(currStep - 1, currStep)) {
				currStep--;
			}

			return false;
		});

		next.click(function() {
			// Second step
			if(currStep == 1) {
				var formData = container.find('form').formToArray();

				// We pop because we never actually wanna submit the form for installation on the second step
				// (the last element in the form is the hidden input telling aFramework to install)
				if(container.find('input[name="aframework_install_submit"]').length) {
					formData.pop();
				}
				$.post('mod/AframeworkInstall.php', formData, function(data) {
					container.html($(data).html()).formHints();

					if(gotoStep(currStep + 1, currStep)) {
						currStep++;
					}
				});
			}
			// Last step
			else if(currStep == container.find('fieldset').length - 1) {
				$.post('mod/AframeworkInstall.php', container.find('form').formToArray(), function(data) {
					container.find('form').html(container.find('form').html() +'<fieldset>' +$(data).html() +'</fieldset>').scrollTo(0, {axis: 'xy'});

					if(gotoStep(currStep + 1, currStep)) {
						currStep++;
					}

					setTimeout(function() {
						buttons.animate({opacity: 0}, 500, function() {
							container.animate({height: 0}, 500);
						});
					}, 3000);
				});
			}
			// The other steps
			else if(gotoStep(currStep + 1, currStep)) {
				currStep++;
			}

			return false;
		});
	}
};
