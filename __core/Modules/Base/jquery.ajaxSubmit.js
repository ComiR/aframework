/**
 * Submits a form using XHR. Grabs all form-controls
 * with name-attributes and submits to form's action
 * using form's method or custom action/method set in conf
 *
 * @class ajaxSubmit
 * @param {String|Function} foo, CSS-selector to element to be updated with XHR-response or callback function for XHR-call (data is passed to function)
 * @param {Object} conf, custom config-object
 */
jQuery.fn.ajaxSubmit = function(foo, conf) {
	var config = {
		method: false,	// request method (get/post) defaults to form's
		action: false,	// action (url) defaults to form's
		loading: 'Loading...'
	};
	config = $.extend(config, conf);

	var callback = (typeof(foo) === 'string') ? function(data) {$(foo).html(data);} : (typeof(foo) === 'function') ? foo : false;

	return this.each(function() {
		var form = $(this);

		if(form.is('form')) {
			var method = config.method || form.attr('method');
			var action = config.action || form.attr('action');
			var submit = $('input[type="submit"]', form);
			var data = {};

			form.submit(function() {
				$('*[name]', form).each(function() {
					var t = $(this);
					var val = (t.attr('type') == 'checkbox') ? (t.attr('checked') == true) ? 1 : 0 : t.val();
					data[t.attr('name')] = val;
				});
				submit.val(config.loading);
				$[method](action, data, function(data) {
					callback(data);
				});

				return false;
			});
		}
	});
};