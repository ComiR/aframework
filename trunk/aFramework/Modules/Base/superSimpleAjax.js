// By Andreas Lagerkvist (andreaslagerkvist.com)
function superSimpleAjax (conf, updateID) {
	// Create config
	var config = {
		method:		conf.method || 'get', 
		url:		conf.url, 
		data:		conf.data || '', 
		callback:	conf.callback || function (data) {
			if (updateID) {
				document.getElementById(updateID).innerHTML = data;
			}
		}
	};

	// Create ajax request object
	var requestObject;

	try {
		requestObject = new XMLHttpRequest();
	}
	catch (e) {
		requestObject = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// This runs when request is complete
	var onReadyStateChange = function () {
		if (requestObject.readyState == 4) {
			config.callback(requestObject.responseText);
		}
	};

	// Send the request
	if (config.method.toUpperCase() == 'POST') {
		requestObject.open('POST', config.url, true);
		requestObject.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		requestObject.onreadystatechange = onReadyStateChange;
		requestObject.send(config.data);
	}
	else {
		requestObject.open('GET', config.url + '?' + config.data, true);
		requestObject.onreadystatechange = onReadyStateChange;
		requestObject.send(null);
	}
}