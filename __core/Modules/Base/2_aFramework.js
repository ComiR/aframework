/*
 * aFramework main JavaScript class
 *
 * Add your modules to aFramework.modules,
 * make sure they have a run()-method which, just like your php-modules, 
 * will be run "onload". Every module in aFramework.modules automatically
 * extends aFramework.Module
 */
var aFramework = {
	/*
	 * run
	 *
	 * Put anything you want to run onload in here.
	 * Do not run your modules' run-methods from here, that
	 * is taken care of on dom ready (bottom of code)
	 */
	run: function() {
		$('body').addClass('js-enabled').removeClass('js-disabled');
		aFramework.general.captchaRefresh('/captcha.png');
		aFramework.general.codeBlocks();
		aFramework.general.toggleTitles();
		aFramework.general.hideTopLinks();
		$.imgzoom();
	}, 

	/*
	 * runModules
	 *
	 * Runs every module in aFramework.modules (mod->run())
	 */
	runModules: function() {
		// Run through all modules
		for(var module in aFramework.modules) {
			if(typeof(aFramework.modules[module].run) == 'function') {
				aFramework.modules[module].run();
			}
		}
	}, 

	/*
	 * general
	 *
	 * General JS-funcionality that can be used by
	 * any aFramework-site (any site really...)
	 */
	general: {
		/*
		 * maxLengthInputs
		 *
		 * Displays num characters left information below max-length inputs
		 * (input.maxlength-100 (where 100 is the max allowed characters))
		 * And also prevents user from typing more than allowed amount.
		 * Add a 'maxlength-100' (change the 100) class to any element you want to apply this to
		 */
		maxLengthInputs: function() {
			$('*[class^="maxlength"]').each(function() {
				var t = $(this), 
					maxLength = t.attr('class').substring(10), 
					left = maxLength - t.val().length;

				var charLeft = $('<span class="characters-left">' +left +' characters left</span>').insertAfter(t);

				t.keyup(function() {
					if(t.val().length > maxLength) {
						t.val(t.val().substring(0, maxLength));
					}
					var left = maxLength - t.val().length;

					charLeft.text(left +' characters left');
				});
			});
		}, 

		hideTopLinks: function(topLinksHref) {
			var href = topLinksHref || '#';
			var topLinks = $('a[href="' +href +'"]');

			if($(window).height() >= $(document).height()) {
				topLinks.each(function() {
					topLink = $(this);
					if(topLink.is(':only-child')) {
						topLink.parent().hide();
					}
					else {
						topLink.hide();
					}
				});
			}
		}, 

		/*
		 * captchaRefresh
		 *
		 * Refreshes captcha images onclick
		 */
		captchaRefresh: function(src) {
			var captchaSrc = src || '/captcha.png';

			$('img[src^="' +captchaSrc +'"]').attr('title', 'Can\'t see what it says? Click me to get a new string.').click(function() {
				var now = new Date();
				$(this).attr('src', captchaSrc +'?' +now.getTime());
			});
		}, 

		/*
		 * toggleTitles
		 *
		 * Makes all input[title]'s values the
		 * title-attribute and toggles '' onclick
		 */
		toggleTitles: function() {
			$('input[title], textarea[title]').each(function() {
				if($(this).val() === '' || $(this).val() == $(this).attr('title')) {
					$(this).addClass('default-value').val($(this).attr('title'));
				}
			})
			.focus(function() {
				if($(this).val() == $(this).attr('title')) {
					$(this).val('').removeClass('default-value');
				}
			})
			.blur(function() {
				if($(this).val() === '' || $(this).val() == $(this).attr('title')) {
					$(this).addClass('default-value').val($(this).attr('title'));
				}
			});
		}, 

		/*
		 * codeBlocks
		 *
		 * Adds some functionality to code-blocks (p.code-block's)
		 */
		codeBlocks: function(parent) {
			var parent = parent || false;

			$('p.code-block', parent).each(function(i) {
				var cp = $(this), 
					cpHeight = cp.outerHeight(), 
					cpMaxHeight = parseInt(cp.css('maxHeight'), 10), 
					buttons = '<p>'; // <input type="button" name="code_block_select" value="Select code" />';
	
				// If actual outer-height of code-block is more than its max-height value
				if(cpHeight > cpMaxHeight) {
					buttons += ' <input type="button" name="code_block_expand" value="Expand code block" />';
				}

				buttons += ' <input type="button" name="code_block_size_down" value="-" title="Decrease code font size" /> <input type="button" name="code_block_size_up" value="+" title="Increase code font size" /></p>';
	
				$(buttons).insertAfter(cp);
			});
	
			// Now add some click-events
			$('input[name="code_block_select"]').click(function() {
				aFramework.utils.selectText($(this).parent().prev('p.code-block'));
			});
			$('input[name="code_block_expand"]').click(function() {
				$(this).parent().prev('p.code-block').css({maxHeight: 'none'});
				$(this).remove();
			});
			$('input[name="code_block_size_up"]').click(function() {
				var cb = $('p.code-block'), 
					size = parseInt(cb.css('fontSize'), 10) + 2;

				cb.css({fontSize: size});
			});
			$('input[name="code_block_size_down"]').click(function() {
				var cb = $('p.code-block'), 
					size = parseInt(cb.css('fontSize'), 10) - 2;

				cb.css({fontSize: size});
			});
		}
	}, 

	/*
	 * Module
	 *
	 * Base module class, every module in aFramework.modules
	 * automatically extends this class
	 */
	Module: {
		// put stuff here every module can use...
	}, 

	modules: [
		// Add your modules here and they will automatically run onload.
		// Not in this file though, create your own .js-file in your module's 
		// directory and then create your js-module through aFramework.modules.MyModule = {};
	]
};

$(document).ready(function() {
	aFramework.run();
	aFramework.runModules();
});