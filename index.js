const express = require('express');
const urlJoin = require('url-join');

module.exports = domain => {
	let app = express();

	var proxy = new Proxy(app, {
		apply: (target, thisArg, argumentsList) => {
			if (!target.guidepost) {
				target.use((request, response) => {
					response.redirect(urlJoin(domain, request.url));
				});
				target.guidepost = true;
			}
			return target(...argumentsList);
		}
	});

	return proxy;
};
