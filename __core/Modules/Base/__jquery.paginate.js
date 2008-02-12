$.paginate = function(what, conf) {
	if(!what) {
		return false;
	}

	var config = {
		itemsPerPage: 1, 
		loop: false, 
		currentPage: 1
	};
	config = $.extend(config, conf);

	var numItems = $(what).length;
	var numPages = Math.ceil(numItems / config.itemsPerPage);

	function nav() {
		var previousPage = (config.currentPage == 1) ? config.numPages : config.currentPage - 1;
		var nextPage = (config.currentPage == config.numPages) ? 1 : config.currentPage + 1;
	}
};

function Paginate(what, itemsPerPage, loop, currentPage)
{
	if(what == undefined)			return false;
	if(itemsPerPage == undefined)	itemsPerPage = 1;
	if(currentPage == undefined)	currentPage = 1;
	if(loop == undefined)			loop = false;

	var numItems = $(what).length;
	var numPages = Math.ceil(numItems / itemsPerPage);

	function Nav()
	{
		var previousPage	= (currentPage == 1)		? numPages : currentPage - 1;
		var nextPage		= (currentPage == numPages) ? 1 : currentPage + 1;
		
		var previous	= '<a href="#" onclick="Paginate(\'' +what +'\', ' +itemsPerPage +', ' +loop +', ' +previousPage +'); return false;">&laquo; Previous</a>';
		var next		= '<a href="#" onclick="Paginate(\'' +what +'\', ' +itemsPerPage +', ' +loop +', ' +nextPage +'); return false;">Next &raquo;</a>';
		
		if(!loop && currentPage == 1)			previous = '<b>&laquo; Previous</b>';
		if(!loop && currentPage == numPages)	next = '<b>Next &raquo;</b>';

		$(what).parent().next('.paginate-navigation').remove();
		$('<p class="paginate-navigation">' +previous +' ' +currentPage +' of ' +numPages +' ' +next +'</p>').insertAfter($(what).parent());
	}

	function Pages()
	{
		var start	= currentPage * itemsPerPage - itemsPerPage;
		var end		= start + itemsPerPage;
	
		$(what).each(function(i)
		{
			$(this).removeClass('hidden-item');
			if(i < start || i >= end)
			{
				$(this).addClass('hidden-item');
			}
		});
	}

	Nav();
	Pages();
}