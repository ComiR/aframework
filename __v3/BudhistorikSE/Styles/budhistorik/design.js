BudhistorikStyle = {
	run: function () {
		this.clickableCTO();
		this.scrollNavigation();
	}, 
	
	clickableCTO: function () {
		$('#quick-about > ul:last-child li').each(function () {
			$(this).click(function () {
				window.location = $(this).find('a').attr('href');
			});
		});
	}, 
	
	scrollNavigation: function () {
		var ul = $('#in-page-navigation ul').eq(0);
		
		ul.find('a').eq(0).addClass('selected');
		
		ul.find('a').click(function () {
			var t = $(this);

			ul.find('a').removeClass('selected');
			t.addClass('selected');
			
			$(window).scrollTo($(t.attr('href')), {
				duration: '250', 
				axis: 'y', 
				easing: 'easeInOutCubic'
			});
			
			return false;
		});
	}
};

$(function () {
	BudhistorikStyle.run();
});