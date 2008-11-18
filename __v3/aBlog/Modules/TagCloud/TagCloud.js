jQuery.fn.tagSizes = function(maxSize, minSize) {
	var maxSize		= maxSize || 24;
	var minSize		= minSize || parseInt(jQuery('li', this).css('font-size'), 10);
	var sizeDiff	= maxSize - minSize;

	return this.each(function() {
		var totalItems	= 0;
		var minItems	= 100000;
		var maxItems	= 0;
		var itemDiff	= 0;

		jQuery('li', this).each(function() {
			var myItems = parseInt(jQuery(this).text().replace(/[^0-9]*/g, ''), 10);

			totalItems += myItems;

			if(maxItems < myItems) {
				maxItems = myItems;
			}
			if(minItems > myItems) {
				minItems = myItems;
			}
		});

		itemDiff = maxItems - minItems;

		jQuery('li', this).each(function() {
			var myItems			= parseInt(jQuery(this).text().replace(/[^0-9]*/g, ''), 10);
			var percentOfMax	= (myItems / maxItems) * 100;
			var percentOfMin	= (myItems / minItems) * 100;
			var percentOfTotal	= (myItems / totalItems) * 100;
			var newSize			= 12;

		//	alert(myItems +', ' +totalItems +' | ' +percentOfTotal +', ' +percentOfMin +', ' +percentOfMax +', ' +minItems +', ' +maxItems +' | ' +sizeDiff +', ' +itemDiff);

			jQuery(this).css('font-size', newSize +'px');
		});
	});
};

aFramework.modules.TagCloud = {
	run: function() {
		$('#tag-cloud').tagSizes();
	}
};