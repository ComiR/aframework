jQuery.fn.fullPageWidthBar = function (config) {
	var conf = $.extend({
		wrapper:	'#wrapper'
	}, config);

	var els = this;

	var bar = function () {
		var docWidth = $(document).width();

		if (docWidth > 960) {
			var distance = (docWidth - $(conf.wrapper).width()) / 2;

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
