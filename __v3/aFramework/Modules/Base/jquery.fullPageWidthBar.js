jQuery.fn.fullPageWidthBar = function (config) {
	var conf = $.extend({
		wrapper:	'#wrapper'
	}, config);

	var els = this;

	var bar = function () {
		var docWidth	= $(document).width();
		var wrapWidth	= $(conf.wrapper).width();

		if (docWidth > wrapWidth) {
			var distance = (docWidth - wrapWidth) / 2;

			els.css({
				marginLeft:		'-' + distance + 'px', 
				marginRight:	'-' + distance + 'px', 
				paddingLeft:	distance + 'px', 
				paddingRight:	distance + 'px'
			});
		}
	};

	bar();
	$(window).resize(bar);

	return els;
};
