/*
 * Paginate 1.0
 *
 * Copyright (c) 2007 Andreas Lagerkvist (exscale.se)
 */
var Paginate =
{
	w: false, 
	cp: false, 

	config: 
	{
		itemsPerPage: 1,
		loop: false
	}, 

	init: function(what, conf, currentPage)
	{
		if(!currentPage)
		{
			currentPage = 1;
		}

		config = $.extend(Paginate.config, conf);
		Paginate.w = what;
		Paginate.cp = currentPage;

		// Create navigation and hide inactive pages
		Paginate.createNavigation();
		Paginate.paginate();
	}, 

	createNavigation: function()
	{
		// Store previous page, next page and html-code for their links
		var numItems = $(Paginate.w).length, 
			numPages = Math.ceil(numItems / Paginate.config.itemsPerPage), 
			previous = '<a href="#" class="paginate-previous">&laquo; Previous</a>', 
			next = '<a href="#" class="paginate-next">Next &raquo;</a>';

		// If we're not looping and have reached end or beginning change link to strong
		if(!Paginate.config.loop && Paginate.cp == 1)
		{
			previous = '<strong class="paginate-previous">&laquo; Previous</strong>';
		}
		if(!Paginate.config.loop && Paginate.cp == numPages)
		{
			next = '<strong class="paginate-next">Next &raquo;</strong>';
		}

		// Find the nearest block-level parent to insert navigation (mustn't be inserted to a ul for example)
		// We want the navigation inserted after the list of items but never inside an element that does not allow
		// block-level elements. If what is something like div > div then navigation should be inserted after last div > div
		// if it's something like ul > li then it should be inserted after the ul
		var insertAfter = $(Paginate.w +':last-child'),  
			doesNotAllowBlock =
			{
				ul: 'ul', 
				ol: 'ol'
			};

		while(1)
		{
			var allowsBlock = true;
			for(var el in doesNotAllowBlock)
			{
				var tmp = insertAfter.parent();
				if(tmp[0].tagName.toLowerCase() == el.toLowerCase())
				{
					allowsBlock = false;
				}
			}
			if(allowsBlock)
			{
				break;
			}
			else
			{
				insertAfter = insertAfter.parent();
			}
		}

		var insertAfterParent = insertAfter.parent();

		// Update or create paginate-navigation
		if($('p.paginate-navigation', insertAfterParent).length)
		{
			$('p.paginate-navigation', insertAfterParent).html(previous +' ' +Paginate.cp +' of ' +numPages +' ' +next);
		}
		else
		{
			$('<p class="paginate-navigation">' +previous +' ' +Paginate.cp +' of ' +numPages +' ' +next +'</p>').insertAfter(insertAfter);
		}

		// Add some onclick-events
		$('a.paginate-previous').click(function()
		{
			Paginate.init(Paginate.w, {itemsPerPage: Paginate.config.itemsPerPage, loop: Paginate.config.loop}, Paginate.cp - 1);

			return false;
		});

		$('a.paginate-next').click(function()
		{
			Paginate.init(Paginate.w, {itemsPerPage: Paginate.config.itemsPerPage, loop: Paginate.config.loop}, Paginate.cp + 1);

			return false;
		});
	}, 

	paginate: function() 
	{
		var start = Paginate.cp * Paginate.config.itemsPerPage - Paginate.config.itemsPerPage, 
			end = start + Paginate.config.itemsPerPage;

		$(Paginate.w).each(function(i)
		{
			$(this).removeClass('hidden-item');
			if(i < start || i >= end)
			{
				$(this).addClass('hidden-item');
			}
		});
	}
};