/***
@title:
Drag to Select

@version:
1.0

@author:
Andreas Lagerkvist

@date:
2009-04-06

@url:
http://andreaslagerkvist.com/jquery/drag-to-select/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.dragToSelect.css

@does:
Use this plug-in to allow your users to select certain elements by dragging a "select box". Works very similar to how you can drag-n-select files and folders in most OS:es.

@howto:
$('#my-files li').dragToSelect(); would make every li in the #my-files-element selectable by dragging. The li:s will recieve a "selected"-class when they are within range of the select box when user drops.

Make sure a parent-element of the selectables has position: relative as well as overflow: auto or scroll.

@exampleHTML:
<ul>
	<li><img src="http://exscale.se/__files/3d/lamp-and-mates/lamp-and-mates-01_small.jpg" alt="Lamp and Mates" /></li>
	<li><img src="http://exscale.se/__files/3d/stugan-winter_small.jpg" alt="The Cottage - Winter time" /></li>
	<li><img src="http://exscale.se/__files/3d/ps2_small.jpg" alt="PS2" /></li>
</ul>

@exampleJS:
$('#jquery-drag-to-select-example li').dragToSelect({
	onHide: function () {
		alert($('#jquery-drag-to-select-example li.selected').length + ' selected');
	}
});
***/
jQuery.fn.dragToSelect = function (conf) {
	// Config
	var config = jQuery.extend({
		id:				'jquery-drag-to-select', 
		activeClass:	'active', 
		selectedClass:	'selected', 
		scrollTH:		10, 
		autoScroll:		false, 
		selectOnMove:	false, 
		onShow:			function () {}, 
		onHide:			function () {}, 
		onRefresh:		function () {}
	}, conf);

	// Store the selectable and parent (first parent with offset)
	var selectable	= $(this);
	var parent		= selectable.parent();

	do {
		if (/auto|scroll/.test(parent.css('overflow'))) {
			break;
		}
		parent = parent.parent();
	} while (parent[0].parentNode);

	var parentOffset	= parent.offset();
	var parentDim		= {
		left:	parentOffset.left, 
		top:	parentOffset.top, 
		width:	parent.width(), 
		height:	parent.height()
	};

	// Current origin of select box
	var selectBoxOrigin = {
		left:	0, 
		top:	0
	};

	// Create select box
	var selectBox = jQuery('<div/>')
						.appendTo(parent)
						.attr('id', config.id)
						.css('position', 'absolute');

	// Shows the select box
	var showSelectBox = function (e) {
		selectBoxOrigin.left	= e.pageX - parentDim.left + parent[0].scrollLeft;
		selectBoxOrigin.top		= e.pageY - parentDim.top + parent[0].scrollTop;

		var css = {
			left:		selectBoxOrigin.left + 'px', 
			top:		selectBoxOrigin.top + 'px', 
			width:		'1px', 
			height:		'1px'
		};
		selectBox.addClass(config.activeClass).css(css);

		config.onShow();
	};

	// Refreshes the select box dimensions and possibly position
	var refreshSelectBox = function (e) {
		if (!selectBox.is('.' + config.activeClass)) {
			return;
		}

		var left		= e.pageX - parentDim.left + parent[0].scrollLeft;
		var top			= e.pageY - parentDim.top + parent[0].scrollTop;
		var newLeft		= left;
		var newTop		= top;
		var newWidth	= selectBoxOrigin.left - newLeft;
		var newHeight	= selectBoxOrigin.top - newTop;

		if (left > selectBoxOrigin.left) {
			newLeft		= selectBoxOrigin.left;
			newWidth	= left - selectBoxOrigin.left;
		}

		if (top > selectBoxOrigin.top) {
			newTop		= selectBoxOrigin.top;
			newHeight	= top - selectBoxOrigin.top;
		}

		var css = {
			left:	newLeft + 'px', 
			top:	newTop + 'px', 
			width:	newWidth + 'px', 
			height:	newHeight + 'px'
		};
		selectBox.css(css);

		config.onRefresh();
	};

	// Function to hide select box
	var hideSelectBox = function (e) {
		if (!selectBox.is('.' + config.activeClass)) {
			return;
		}

		selectBox.removeClass(config.activeClass);

		config.onHide();
	};

	// Scrolls parent if needed
	var scrollPerhaps = function (e) {
		if (!selectBox.is('.' + config.activeClass)) {
			return;
		}

		// Scroll down
		if ((e.pageY + config.scrollTH) > (parentDim.top + parentDim.height)) {
			parent[0].scrollTop += config.scrollTH;
		}
		// Scroll up
		if ((e.pageY - config.scrollTH) < parentDim.top) {
			parent[0].scrollTop -= config.scrollTH;
		}
		// Scroll right
		if ((e.pageX + config.scrollTH) > (parentDim.left + parentDim.width)) {
			parent[0].scrollLeft += config.scrollTH;
		}
		// Scroll left
		if ((e.pageX - config.scrollTH) < parentDim.left) {
			parent[0].scrollLeft -= config.scrollTH;
		}
	};

	// Selects all the elements in the select box's range
	var selectElementsInRange = function () {
		if (!selectBox.is('.' + config.activeClass)) {
			return;
		}

		var selectBoxOffset = selectBox.offset();
		var selectBoxDim = {
			left:	selectBoxOffset.left, 
			top:	selectBoxOffset.top, 
			width:	selectBox.width(), 
			height:	selectBox.height()
		};

		selectable.each(function (i) {
			var el			= $(this);
			var elOffset	= el.offset();
			var elDim		= {
				left:	elOffset.left, 
				top:	elOffset.top, 
				width:	el.width(), 
				height:	el.height()
			};

			if (
				(selectBoxDim.left < elDim.left) && 
				(selectBoxDim.top < elDim.top) && 
				((selectBoxDim.left + selectBoxDim.width) > (elDim.left + elDim.width)) && 
				((selectBoxDim.top + selectBoxDim.height) > (elDim.top + elDim.height))
			) {
				el.addClass(config.selectedClass);
			}
			else {
				el.removeClass(config.selectedClass);
			}
		});
	};

	// Do the right stuff then return this
	selectBox
		.mousemove(function (e) {
			refreshSelectBox(e);

			if (config.selectOnMove) {			
				selectElementsInRange();
			}

			if (config.autoScroll) {
				scrollPerhaps(e);
			}
		})
		.mouseup(function(e) {
			selectElementsInRange();
			hideSelectBox(e);
		});

	if (jQuery.fn.disableTextSelect) {
		parent.disableTextSelect();
	}

	parent
		.mousedown(showSelectBox)
		.mousemove(function (e) {
			refreshSelectBox(e);

			if (config.selectOnMove) {			
				selectElementsInRange();
			}

			if (config.autoScroll) {
				scrollPerhaps(e);
			}
		})
		.mouseup(function (e) {
			selectElementsInRange();
			hideSelectBox(e);
		});

	// Be nice
	return this;
};