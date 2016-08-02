const express = require('express');
const urlJoin = require('url-join');

module.exports = domain => {
	let app = express();

	app.use((request, response) => {
		response.redirect(urlJoin(domain, request.url));
	});

	return app;
}
