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
jquery, jquery.pixasticEditor.css, jquery.form.js, pixastic.custom.js

@does:
This plug-in inserts a stylable toolbar next to any image in your document that allows the user to apply different Pixastic-effects to the image.

@howto:
$('#my-image').pixasticEditor(); would insert the editor in the #my-image-element and affect an img-element within #my-image. Since it's not possible to append a list or div or any other element directly to an image, the plug-in should be run on a parent-element (preferably div) of the img-element. If you have a list of images you could run it on each li of the list.

@exampleHTML:
<img src="/af/AndreasLagerkvist/Files/lamp-and-mates.jpg" alt="Lamp and Mates" />

@exampleJS:
$(function () {
	var img = $('#jquery-pixastic-editor-example').addClass('horizontal-toolbar horizontal-form').find('img')[0];

	if (img.complete) {
		$('#jquery-pixastic-editor-example').pixasticEditor();
	}
	else {
		img.onload = function () {
			$('#jquery-pixastic-editor-example').pixasticEditor();
		};
	}
});

$('#jquery-pixastic-editor-example').pixasticEditor();
***/
jQueryPixasticEditorOptions = {"blend":[{"key":"amount","title":"Amount","description":"Amount of the image to blend. Value between 0 and 1.","type":"float","min":"0","max":"1"},{"key":"mode","title":"Mode","description":"The blend mode. One of \"normal\", \"multiply\", \"lighten\", \"darken\", \"lightercolor\", \"darkercolor\", \"difference\", \"screen\", \"exclusion\", \"overlay\", \"softlight\", \"hardlight\", \"colordodge\", \"colorburn\", \"lineardodge\", \"linearburn\", \"linearlight\", \"vividlight\", \"pinlight\", \"hardmix\".","type":"string"},{"key":"image","title":"Image","description":"Image element to blend with original image.","type":"image"}],"blur":[{"key":"fixMargin","title":"FixMargin","description":"If true, the image marginLeft\/Top will be adjusted to compensate for IE making the image slightly larger. Defaults to true.","type":"bool","default":"true"}],"blurfast":[{"key":"amount","title":"Amount","description":"The strength of the blur effect. Value between 0 and 5.","type":"float","min":"0","max":"5"}],"brightness":[{"key":"brightness","title":"Brightness","description":"The brightness value used, -150 to 150.","type":"int","min":"-150","max":"150"},{"key":"contrast","title":"Contrast","description":"The contrast value, -1 to infinity, where a negative value decreases contrast, zero does nothing and positive values increase contrast.","type":"float"},{"key":"legacy","title":"Legacy","description":"If true, brightness will be adjusted the same way Photoshop used to prior to CS3 (now called \"Legacy\" in the B&amp;C dialog). This means the brightness value is simply added to the pixel value, in effect shifting the entire histogram left or right.","type":"bool"}],"coloradjust":[{"key":"red","title":"Red","description":"Amount to shift red, value from -1 to 1.","type":"float","min":"-1","max":"1"},{"key":"green","title":"Green","description":"Amount to shift green, value from -1 to 1.","type":"float","min":"-1","max":"1"},{"key":"blue","title":"Blue","description":"Amount to shift blue, value from -1 to 1.","type":"float","min":"-1","max":"1"}],"colorhistogram":[{"key":"paint","title":"Paint","description":"If true, the histograms will be painted on the image","type":"bool"},{"key":"returnValue","title":"ReturnValue","description":"An return value object which will hold the values (in the \"values\" property) of the histogram after execution.","type":"array"}],"crop":[],"desaturate":[{"key":"average","title":"Average","description":"If true, (R+G+B)\/3 will be used as the brigtness value","type":"bool"}],"edges":[{"key":"mono","title":"Mono","description":"Set to true to convert image to greyscale.","type":"bool"},{"key":"invert","title":"Invert","description":"Set to true to invert image.","type":"bool"}],"edges2":[],"emboss":[{"key":"strength","title":"Strength","description":"The strength of the effect. Value between 0 and 10.","type":"float","min":"0","max":"10"},{"key":"greyLevel","title":"GreyLevel","description":"The standard level of grey in the final image. A value between 0 and 255. Defaults to 180.","type":"int","min":"0","max":"255","default":"180"},{"key":"direction","title":"Direction","description":"The \"direction\" of the light source. One of \"topleft\", \"top\", \"topright\", \"right\", \"bottomright\", \"bottom\", \"bottomleft\" or \"left\".","type":"string"},{"key":"blend","title":"Blend","description":"If true, the embossed image will be blended with the original image rather than producing a greyscale image.","type":"bool"}],"exposure":[{"key":"level","title":"Level","description":"Exposure level, value from 0 to 10.","type":"float","min":"0","max":"10"}],"fliph":[],"flipv":[],"glow":[{"key":"amount","title":"Amount","description":"The strength of the glow effect. Value between 0 and 1.","type":"float","min":"0","max":"1"},{"key":"radius","title":"Radius","description":"The radius of the blur effect used to create the glow. Value between 0 and 1.","type":"float","min":"0","max":"1"}],"histogram":[{"key":"average","title":"Average","description":"How to convert RGB to greyscale, as explained in the <a href=\"Desaturate\">Desaturate<\/a> action.","type":"bool"},{"key":"paint","title":"Paint","description":"If true, the histogram will be painted on the image","type":"bool"},{"key":"color","title":"Color","description":"The color of the histogram that is drawn. Ie. \"rgb(255,255,255)\" for white.","type":"string"},{"key":"returnValue","title":"ReturnValue","description":"An return value object which will hold the values (in the \"values\" property) of the histogram after execution.","type":"array"}],"hsl":[{"key":"hue","title":"Hue","description":"Hue shift, -180 to 180","type":"int","min":"-180","max":"180"},{"key":"saturation","title":"Saturation","description":"Saturation, -100 to 100","type":"int","min":"-100","max":"100"},{"key":"lightness","title":"Lightness","description":"Lightness, -100 to 100","type":"int","min":"-100","max":"100"}],"invert":[],"laplace":[{"key":"greyLevel","title":"GreyLevel","description":"Level of grey added to image.","type":"int"},{"key":"edgeStrength","title":"EdgeStrength","description":"A positive value indicating the \"density\" of the edges.","type":"float"},{"key":"invert","title":"Invert","description":"Set to true to invert the final image.","type":"bool"}],"lighten":[{"key":"amount","title":"Amount","description":"The strength of the lighten\/darken effect. A value between -1 and 1, where positive values lighten the image and negative values darken the image.","type":"float","min":"-1","max":"1"}],"mosaic":[{"key":"blockSize","title":"BlockSize","description":"Size of the pixelated blocks, value greater than 1.","type":"int"}],"noise":[{"key":"amount","title":"Amount","description":"The amount of noise added to the image. Value between 0 and 1, ie. a value of 0.5 means that every other pixel is affected.","type":"float","min":"0","max":"1"},{"key":"strength","title":"Strength","description":"The strength of the noise. Value between 0 and 1.","type":"float","min":"0","max":"1"},{"key":"mono","title":"Mono","description":"Set to true to enable greyscale\/monochromatic noise.","type":"bool"}],"pointillize":[{"key":"radius","title":"Radius","description":"Radius of the points, value greater than 1.","type":"int"},{"key":"density","title":"Density","description":"Density of the points. Value from 0 to 5. A value of 1 gives a total of (width * height \/ diameter) points.","type":"float","min":"0","max":"5"},{"key":"noise","title":"Noise","description":"Noise in the distribution of the points, value equal to or greater than 0.","type":"float"},{"key":"transparent","title":"Transparent","description":"If true, the points will be painted on a transparent background, otherwise they are painted on top of the original image.","type":"bool"}],"posterize":[{"key":"levels","title":"Levels","description":"Number of levels, 0 to 255","type":"int","min":"0","max":"255"}],"removenoise":[],"sepia":[],"sharpen":[{"key":"amount","title":"Amount","description":"The amount of sharpening. Value between 0 and 1.","type":"float","min":"0","max":"1"}],"solarize":[],"unsharpmask":[{"key":"amount","title":"Amount","description":"The strength of the sharpening effect. Value between 0 and 500.","type":"float","min":"0","max":"500"},{"key":"radius","title":"Radius","description":"The radius of the blur effect used in the unsharp mask. Value between 0 and 5.","type":"float","min":"0","max":"5"},{"key":"threshold","title":"Threshold","description":"The threshold of the sharpening effect. Value between 0 and 255.","type":"float","min":"0","max":"255"}]};
jQuery.fn.pixasticEditor = function (conf, cb) {
	var c = typeof(conf) == 'object' ? conf : {};

	var config = jQuery.extend({
		className:			'jquery-pixastic-editor', 
		loadingClass:		'loading', 
		submitButtonText:	'Apply effect', 
		cancelButtonText:	'Cancel', 
		boolTrueText:		'True', 
		boolFalseText:		'False', 
		legendText:			'Settings for', 
		noOptionsText:		'No options required.', 
		previewWidth:		160, 
		previewHeight:		120, 
		fullPreview:		false, 
		ignoreEffects:		{}
	}, c);

	return this.each(function () {
		// First run
		if (!this.pixasticEditor) {
			var container	= jQuery(this).addClass(config.className);
			var image		= jQuery(this).find('img').addClass(config.className + '-image')[0];

			// Wrap the image in a container and run DragToSelect on it
			// - every effect can be applied to just a portion of the image
			if (jQuery.fn.dragToSelect) {
				jQuery(image).wrap('<div/>').parent().addClass(config.className + '-drag-to-select').dragToSelect({
					onHide: function (box) {
						if (box.width() < 2) {
							box.removeClass('fake-active');
						}
						else {
							box.addClass('fake-active');
						}
					}
				});
			}

			/**
			 * This element's pixastic editor
			 **/
			this.pixasticEditor = {
				image:		image, 
				canvas:		false, 
				toolbar:	false, 

				/**
				 * Initializes the editor
				 **/
				init: function () {
					this.buildToolbar();
					this.hijaxToolbar();
					this.clickToSave();
				}, 

				/**
				 * Allows user to click image to save it
				 **/
				clickToSave: function () {
					var self = this;

					container.click(function (e) {
						var clicked = jQuery(e.target);

						if (clicked.is('canvas.' + config.className + '-image')) {
							self.saveImage();
						}
					});
				}, 

				/**
				 * Builds the toolbar
				 **/
				buildToolbar: function () {
					var toolbar	= '<ul class="' + config.className + '-toolbar">';
					var tmp		= '';

					// Go through every action Pixastic offers
					for (var i in Pixastic.Actions) {
						tmp = i.charAt(0).toUpperCase() + i.substr(1); // ucfirst

						// Skip the ones the user wants to ignore
						if (typeof(config.ignoreEffects[i]) == 'undefined') {
							toolbar += '<li><a href="#" class="' 
											+ i 
											+'" title="'	// I normally wouldn't do this but we're
											+ tmp			// replacing all the links with icons so...
											+ '">' 
											+ tmp 
											+ '</a></li>';
						}
					}

					this.toolbar = jQuery(toolbar + '</ul>').appendTo(container);
				}, 

				/**
				 * Hijaxes the toolbar-links
				 **/
				hijaxToolbar: function () {
					var self = this;

					this.toolbar.click(function (e) {
						var clicked = jQuery(e.target);

						// Make sure a link was clicked
						if (clicked.is('a')) {
							// The effect-name is stored in the class-name
							var effect = clicked.attr('class');

							// Applies the effect to the image
							var doEffect = function (opts) {
								var o = opts || null;

								// Some effects take a while, add a loading-class
								clicked.addClass(config.loadingClass);

								// If drag to select is used, set the rect-option from its size
								if (container.find('div.jquery-drag-to-select.fake-active').length) {
									o.rect = self.getRectFromBox();
								}
								else {
									o.rect = self.getRectFromImage();
								}

								// Store the canvas for later use and run the effect on either previous canvas or image (first run)
								self.canvas = Pixastic.process(self.canvas || self.image, effect, o, function () {
									// When done, remove loading-class and rect
									clicked.removeClass(config.loadingClass);
									container.find('div.jquery-drag-to-select.fake-active').removeClass('fake-active');
								});
							};

							// Get the various options (if any) for this effect
							var opts = jQueryPixasticEditorOptions[effect];

							// Make sure options are required
							// No, always generate a form with preview, 
							// even if options aren't required
							// so that user gets to confirm effect
							if (true) { // (options.length) {
								var form = self.generateForm(opts, effect);

								self.insertLivePreview(form, effect);

								form
									.submit(function () {
										form.remove();
										jQuery('canvas.' + config.className + '-preview').remove();
										doEffect(self.formArrayToOptions(form.formToArray()));

										return false;
									})
									.find('input[type=reset]').click(function () {
										form.remove();
										jQuery('canvas.' + config.className + '-preview').remove();
									})
									.end()
									.find(':input:first').focus();
							}
							// No options required, do the effect right away
							else {
								doEffect();
							}

							return false;
						}
					});
				}, 

				/**
				 * Turns an array of form elements (returned from formToArray())
				 * into a valid pixastic options object
				 **/
				formArrayToOptions: function (formArray) {
					var opts = [];

					for (i = 0; formArray[i]; i++) {
						opts[formArray[i].name] = formArray[i].value;

						if (opts[formArray[i].name] === '0' || opts[formArray[i].name] === '1') {
							opts[formArray[i].name] = opts[formArray[i].name] === '0' ? false : true;
						}
					}

					return opts;
				}, 

				/**
				 * Returns a rect-object based on a drag to select div's dimensions
				 **/
				getRectFromBox: function () {
					var imageOffset	= container.find('div.' + config.className + '-drag-to-select').offset();
					var box			= container.find('div.jquery-drag-to-select')
					var boxOffset	= box.offset();

					return {
						left:	boxOffset.left - imageOffset.left, 
						top:	boxOffset.top - imageOffset.top, 
						width:	box.width(), 
						height:	box.height()
					};
				}, 

				/**
				 * Returns a rect-object based on the image's dimensions
				 **/
				getRectFromImage: function () {
					var img	= container.find('.' + config.className + '-image');

					return {
						left:	0, 
						top:	0, 
						width:	img.width(), 
						height:	img.height()
					};
				}, 

				/**
				 * Inserts a live preview into 'form'
				 **/
				insertLivePreview: function (form, effect) {
					var self = this;

					// Create new canvas and append to the form
					var previewCanvas	= document.createElement('canvas');
					var currentCanvas	= this.canvas || this.image;
					var previewWidth	= config.fullPreview ? currentCanvas.width : config.previewWidth;
					var previewHeight	= config.fullPreview ? currentCanvas.height : config.previewHeight;

					previewCanvas.width	= previewWidth;
					previewCanvas.height= previewHeight;

					if (config.fullPreview) {
						var currentCanvasOffset	= jQuery(currentCanvas).offset();

						jQuery(previewCanvas)
							.appendTo(document.body)
							.addClass(config.className + '-preview')
							.css({
								left:	currentCanvasOffset.left + 'px', 
								top:	currentCanvasOffset.top + 'px'
							});
					}
					else {
						jQuery(previewCanvas).insertAfter(form.find('legend'));
					}

					// This resets the preview, applies the effect and updates it
					var applyEffect = function () {
						// Update preview with original (no effect that wasn't in original)
						previewCanvas.getContext('2d').drawImage(currentCanvas, 0, 0, currentCanvas.width, currentCanvas.height, 0, 0, previewWidth, previewHeight);

						// Apply effect to (reset:ed) preview and store in temporary canvas
						var tmpCanvas = Pixastic.process(
							previewCanvas, 
							effect, 
							jQuery.extend(
								self.formArrayToOptions(form.formToArray()), {
									leaveDOM: true
								}
							)
						);

						// Draw temp canvas on preview
						previewCanvas.getContext('2d').drawImage(tmpCanvas, 0, 0, previewWidth, previewHeight);
					};

					// Apply effect now
					setTimeout(applyEffect, 1000);

					// And when form-field changes
					form.find(':input').change(function () {
						applyEffect();
					});
				}, 

				/**
				 * Generates a form (jQuery object with form-element)
				 * based on different options, appends it to body and returns it
				 **/
				generateForm: function (opts, effectName) {
					// Remove old form
					container.find('form.' + config.className + '-form').remove();

					// Build new
					var numOptions	= opts.length;
					var formItem	= '';
					var newFormItem	= false;
					var form		= jQuery(
										'<form method="post" action="" class="' 
										+ config.className 
										+ '-form"><fieldset><legend>' 
										+ config.legendText 
										+ ' ' 
										+ effectName 
										+ '</legend></fieldset></form>')
											.appendTo(container);

					for (var i = 0; i < numOptions; i++) {
						// Give bool-settings true/false radios
						if (opts[i].type == 'bool') {
							formItem	= '<p>'
										+ opts[i].title
										+ '<br /><small>' 
										+ opts[i].description 
										+ '</small><br /><label><input type="radio" name="' 
										+ opts[i].key 
										+ '" value="1"';

							// And preselect the correct one
							if (!opts[i]['default'] || opts[i]['default'] == 'true') {
								formItem += ' checked="checked"';
							}

							formItem	+= ' /> ' 
										+ config.boolTrueText 
										+ '</label> <label><input type="radio" name="' 
										+ opts[i].key 
										+ '" value="0"';

							if (opts[i]['default'] && opts[i]['default'] != 'true') {
								formItem += ' checked="checked"';
							}

							formItem	+= ' /> ' 
										+ config.boolFalseText 
										+ '</label></p>';
						}
						// Everything else gets text-fields
						else {
							formItem	= '<p><label>' 
										+ opts[i].title 
										+ '<br /><small>' 
										+ opts[i].description 
										+ '</small><br /><input type="text" name="' 
										+ opts[i].key 
										+ '"'; 

							// Set default value
							if (opts[i]['default']) {
								formItem+= ' value="' + opts[i]['default'] + '"';
							}
							else if (opts[i].min) {
								formItem += ' value="' + Math.round((parseInt(opts[i].min, 10) + parseInt(opts[i].max, 10)) / 2) + '"';
							}

							formItem	+= ' /></label></p>';
						}

						newFormItem = jQuery(formItem).appendTo(form.find('fieldset'));

						// If this option has a min/max-value and the
						// user has UI slider installed, create a slider
						if (opts[i].min && jQuery.fn.slider) {
							jQuery('<div class="' + config.className + '-slider"><div class="ui-slider"><div class="ui-slider-handle"></div></div></div>')
								.appendTo(newFormItem)
								.find('div.ui-slider')
								.slider({
									min:		parseInt(opts[i].min, 10), 
									max:		parseInt(opts[i].max, 10), 
									value:		parseInt(newFormItem.find(':input').val(), 10), 
								//	stepping:	options[i].type == 'float' ? 0.1 : 1, 
									slide:		function (e, ui) {
										jQuery(ui.handle)
											.parents('p')
											.eq(0)
												.find(':input')
													.val(ui.value);
									}, 
									change:		function (e, ui) {
										jQuery(ui.handle)
											.parents('p')
											.eq(0)
												.find(':input')
													.val(ui.value)
													.change(); // Only trigger change when user stops sliding
									}
								});

							// Update the slider when the input changes
							newFormItem.find(':input').keyup(function () {
								jQuery(this)
									.parents('p')
									.find('div.ui-slider')
									.slider('option', 'value', jQuery(this).val());
							});
						}
					}

					// If no options are required, say so
					if (numOptions == 0) {
						jQuery('<p>' + config.noOptionsText + '</p>').appendTo(form.find('fieldset'));
					}

					// Add submit and reset buttons last
					jQuery(
						'<p><input type="submit" value="' 
						+ config.submitButtonText 
						+ '" class="submit" /><input type="reset" value="' 
						+ config.cancelButtonText 
						+ '" class="reset" /></p>'
					).appendTo(form.find('fieldset'));

					return form;
				}, 

				/**
				 * "Saves" the image
				 **/
				saveImage: function (callback) {
					if (this.canvas) {
						var dataURL = this.canvas.toDataURL();

						if (typeof(callback) == 'function') {
							callback(dataURL);
						}
						else {
							window.open(dataURL);
						}
					}
				}
			};

			this.pixasticEditor.init();
		}
		// Save call
		else if (conf == 'save') {
			this.pixasticEditor.saveImage(cb);
		}
	});
};