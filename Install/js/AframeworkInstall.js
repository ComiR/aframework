aFramework.modules.AframeworkInstall = {
	run: function () {
		this.addPrevNextButtons();
		$('#aframework-install').checkedCheckboxParent();
	//	this.bubbleTips();
	}, 

	// Bugs out with display table and that
	bubbleTips: function () {		
		$('#aframework-install form > ol > li:eq(1) li').each(function (i) {
			var li = $(this);

			if (li.attr('title').length) {
				li
					.attr('id', 'jquery-bubble-tip-mandatory-id-' + i)
					.bubbletip('<div id="jquery-bubble-tip-mandatory-id-2-' 
								+ i 
								+ '" class="site-info-bubble">' 
								+ li.attr('title') 
								+ '</div>'
					);
			}
		});
	}, 

	ajaxifyStylesSelection: function () {
		// Allow user to single click style-name to select that style
		// Allow user to double-click to select that style as the default
	}, 

	addPrevNextButtons: function () {
		var isInstalled	= false;
		var container	= $('#aframework-install').scrollTo(0, {axis: 'xy'});
		var buttons		= $('<div id="aframework-install-prev-next-buttons"><div><a href="#">Previous</a></div><div><a href="#">Next</a></div></div>').prependTo(document.body);
		var prev		= buttons.find('a').eq(0);
		var next		= buttons.find('a').eq(1);
		var currStep	= 0;
		var scrollOpts	= {
			axis:		'xy', 
			duration:	200, 
			easing:		'easeOutQuad'
		};

		// If user clicks tab or enter in form
		var hijaxTabAndEnter = function () {
			$('#aframework-install :input').keypress(function (e) {
				var fieldset			= $(this).parents('fieldset').eq(0);
				var allInputsInFieldset	= fieldset.find(':input');
				var thisIndex			= allInputsInFieldset.index(this);
				var nextFieldset		= fieldset.parents('li').eq(0).nextAll('li').eq(0).find('fieldset');

				if (e.keyCode == 13 || e.keyCode == 9) {
					if (thisIndex == (allInputsInFieldset.length - 1)) {
						gotoNext(function () {
							nextFieldset.find(':input').eq(0).focus();
						});

						return false;
					}
					if (e.keyCode == 13) {
						return false;
					}
				}
			});
		};

		// Animates content-height and scrolls content from cStep to nStep, is run when user clicks prv/next-buttons
		var gotoStep = function (nStep, cStep) {
			// Get all steps
			var allSteps = container.find('form > ol > li');

			// Make sure new step isnt bigger or smaller than allowed
			if (nStep >= 0 && nStep < allSteps.length) {
				// Calculate the next step's height
				var nextStepHeight = allSteps.eq(nStep).outerHeight();

				// Animate the container to the new steps height
				container.animate({height: nextStepHeight +'px'}, 500, function () {
					// Then scroll it in position
					container.scrollTo(allSteps.eq(nStep), scrollOpts);
				});

				return true;
			}

			return false;
		};

		// Goes to next step
		var gotoNext = function (cb) {
			var callback = typeof(cb) == 'function' ? cb : function () {};

			// Enable previous button
			if ((currStep + 1) > 0) {
				prev.removeClass('disabled');
			}

			// User is leaving the second step (sites)
			if (currStep == 1) {
				// Remove potential submit-button (we never want to submit for installation from the second step)
				container.find('form > p').remove();

				// Remove form-hints
				container.find('form input.default-value').val('');

				// Post all the form-data to the install-module
				$.post('mod/AframeworkInstall.php', container.find('form').formToArray(), function (data) {
					container.html($(data).checkedCheckboxParent().html()).formHints();

					aFramework.modules.AframeworkInstall.ajaxifyStylesSelection();
					hijaxTabAndEnter();
					callback();

					if (gotoStep(currStep + 1, currStep)) {
						currStep++;
					}
				});
			}
			// User is leaving last step (styles)
			else if (currStep == container.find('form > ol > li').length - 1) {
				// Disable both buttons
				next.addClass('disabled');
				prev.addClass('disabled');

				// Make sure user isn't double-cliking the last step
				if (isInstalled) {
					return false;
				}

				isInstalled = true;

				// Remove form-hints
				container.find('form input.default-value').val('');

				// Post all the form-data to the install-module
				$.post('mod/AframeworkInstall.php', 
					container.find('form').formToArray(), 
					function (data) {
						// Don't replace the contents of the form, simply add the response to its own li
						// Why am I not using appendTo???
						container
							.find('form > ol')
							.html(
								container
									.find('form > ol')
									.html() + '<li>' + $(data).html() + '</li>'
							)
							.scrollTo(0, {axis: 'xy'});

						// And then scroll to that, new, last step
						if (gotoStep(currStep + 1, currStep)) {
							currStep++;
						}

						// After 5 secs, slide container dowm
						setTimeout(function () {
							buttons.animate({opacity: 0}, 500, function () {
								container.animate({height: 0}, 500);
							});
						}, 5000);
					}
				);
			}
			// The other steps, just go to next
			else if (gotoStep(currStep + 1, currStep)) {
				currStep++;
				callback();
			}
		};

		// Goes to previous ste
		var gotoPrevious = function () {
			// Either enable or disable previous-button
			if ((currStep - 1) > 0) {
				prev.removeClass('disabled');
			}
			else {
				prev.addClass('disabled');
			}

			// And try to go to previous step
			if (gotoStep(currStep - 1, currStep)) {
				currStep--; // Only adjust currentStep if success
			}
		};

		// Disable previous-button, remove submit-button, set container's height to 0 and fade in wrapper
		prev.addClass('disabled');
		container.find('form > p').remove();
		container.css('height', 0);
		$('#wrapper-c').css('opacity', 1);
		hijaxTabAndEnter();

		// After 2 secs, animate container to the first step's height and then fade in the buttons
		setTimeout(function () {
			container.animate({height: container.find('form > ol > li').eq(0).outerHeight() +'px'}, 500, function () {
				buttons.animate({opacity: 1}, 500);
			})
		}, 2000);

		// When user clicks the previous-button
		prev.click(function () {
			gotoPrevious();
			return false;
		});

		// When user clicks next-button
		next.click(function () {
			gotoNext();
			return false;
		});
	}
};
