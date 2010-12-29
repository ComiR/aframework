WM.modules.FaqCategories = {
	init: function () {
		this.togglableFAQ();
		this.insertFAQCategories();
	}, 

	togglableFAQ: function () {
		$('body.page-faq #page h5').each(function () {
			var question = $(this);

			question.nextAll('p').eq(0).slideUp(0);

			question.wrapInner('<a href="#">* </a>').find('a').click(function () {
				question.nextAll('p').eq(0).slideToggle(100);

				return false;
			});
		});
	}, 

	insertFAQCategories: function () {
		var html = '<ul>';

		$('body.page-faq #page h3').each(function (i) {
			var faqCat = $(this);

			faqCat.attr('id', 'faq-category-' + i);

			html += '<li><a href="#faq-category-' + i + '">* ' + faqCat.html() + '</a></li>';
		});

		html += '</ul>';

		$('#faq-categories p').replaceWith(html);
	}
};
