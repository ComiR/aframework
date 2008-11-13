aFramework.modules.AframeworkInstall = {
	run: function() {
		this.addPrevNextButtons();
		$('#aframework-install').checkedCheckboxParent();
	}, 

	ajaxifyStylesSelection: function() {
		// Allow user to single click style-name to select that style
		// Allow user to double-click to select that style as the default
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
			var allSteps = container.find('fieldset');

			if(nStep >= 0 && nStep < allSteps.length) {
				var nextStepHeight = allSteps.eq(nStep).outerHeight();

				container.animate({height: nextStepHeight +'px'}, 500, function() {
					container.scrollTo(allSteps.eq(nStep), scrollOpts);
				});

				return true;
			}

			return false;
		};

		container.find('form > p').remove();
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

				$.post('mod/AframeworkInstall.php', formData, function(data) {
					var newData = $(data).find('fieldset').get().splice(2);

					$(newData).appendTo(container.find('form')).formHints();
					aFramework.modules.AframeworkInstall.ajaxifyStylesSelection();

					if(gotoStep(currStep + 1, currStep)) {
						currStep++;
					}
				});
			}
			// Last step
			else if(currStep == container.find('fieldset').length - 1) {
				var formData = container.find('form').formToArray();

				formData[formData.length] = {name: 'aframework_install_submit', value: '1'};

				$.post('mod/AframeworkInstall.php', 
					formData, 
					function(data) {
						container
							.find('form')
							.html(
								container
									.find('form')
									.html() +'<fieldset>' +$(data).html() +'</fieldset>'
							)
							.scrollTo(0, {axis: 'xy'});

						if(gotoStep(currStep + 1, currStep)) {
							currStep++;
						}

						setTimeout(function() {
							buttons.animate({opacity: 0}, 500, function() {
								container.animate({height: 0}, 500);
							});
						}, 5000);
					}
				);
			}
			// The other steps
			else if(gotoStep(currStep + 1, currStep)) {
				currStep++;
			}

			return false;
		});
	}
};
