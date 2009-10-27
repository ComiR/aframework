(function () {
	var distance = ($(document).width() - 960) / 2;

	$('#tertiary-content, #footer').each(function () {
		var oldPaddingLeft = parseInt($(this).css('paddingLeft'), 10);
		var oldPaddingRight = parseInt($(this).css('paddingRight'), 10);

		$(this).css({
			marginLeft:		'-' + distance + 'px', 
			marginRight:	'-' + distance + 'px', 
			paddingLeft:	(distance + oldPaddingLeft) + 'px', 
			paddingRight:	(distance + oldPaddingRight) + 'px'
		});
	});
})();
