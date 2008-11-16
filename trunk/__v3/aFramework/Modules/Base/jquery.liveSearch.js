/***
@title:
Live Search

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-08-31

@url:
http://andreaslagerkvist.com/jquery/live-search/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery

@does:
Turns a normal form-input into a live ajax search widget.

@howto:
jQuery('#q').liveSearch({url: '/ajax/search.php?q='}); would add the live-search container next to the input#q element and fill it with the contents of /ajax/search.php?q=THE-INPUTS-VALUE onkeyup of the input.

@exampleHTML:
<form method="post" action="/search/">

	<p>
		<label>
			Enter search terms<br />
			<input type="text" name="q" />
		</label> <input type="submit" value="Go" />
	</p>

</form>

@exampleJS:
jQuery('#jquery-live-search-example input[name="q"]').liveSearch({url: WEBROOT +'?module=SearchResults&q='});
***/
jQuery(document.body).click(function(e) {
	var target		= jQuery(e.target);
	var className	= 'live-search-results';

	if(!target.is('div.' +className) && !target.parents('.' +className).length) {
		jQuery('div.' +className).slideUp(400);
	}
});
jQuery.fn.liveSearch = function(conf) {
	var config = jQuery.extend({
		url:			'/?module=SearchResults&q=', 
		className:		'live-search-results', 
		speed:			400, 
		typeDelay:		200,
		loadingClass:	'ajax-loading'
	}, conf);

	return this.each(function() {
		var input		= jQuery(this).attr('autocomplete', 'off');
		var tmpOffset	= input.offset();
		var inputDim	= {
			left:	tmpOffset.left, 
			top:	tmpOffset.top, 
			width:	input.outerWidth(), 
			height:	input.outerHeight()
		};
		var liveSearch		= jQuery('<div class="' +config.className +'"></div>').appendTo(document.body).hide().slideUp(0);
		var resultsShit		= parseInt(liveSearch.css('paddingLeft'), 10) + parseInt(liveSearch.css('paddingRight'), 10) + parseInt(liveSearch.css('borderLeftWidth'), 10) + parseInt(liveSearch.css('borderRightWidth'), 10);

		inputDim.topNHeight	= inputDim.top + inputDim.height;
		inputDim.widthNShit	= inputDim.width - resultsShit;

		liveSearch.css({
			position:	'absolute', 
			left:		inputDim.left +'px', 
			top:		inputDim.topNHeight +'px',
			width:		inputDim.widthNShit +'px'
		});

		input.keyup(function() {
			if(this.value != this.lastValue) {
				input.addClass(config.loadingClass);

				var q = this.value;

				if(this.timer) {
					clearTimeout(this.timer);
				}

				this.timer = setTimeout(function() {
					jQuery.get(config.url +q, function(data) {
						input.removeClass(config.loadingClass);

						if(data.length && q.length) {
							liveSearch.html(data).slideDown(config.speed);
						}
						else {
							liveSearch.slideUp(config.speed);
						}
					});
				}, config.typeDelay);

				this.lastValue = this.value;
			}
		});
	});
};