import test from 'ava';
import got from 'got';
import getPort from 'get-port';
import guidepost from './';

const httpConfig = {
	followRedirect: false
};

test.beforeEach(async t => {
	t.context.port = await getPort();
	t.context.app = guidepost('https://google.com');
});

const get = (t, route) => {
	return got(`localhost:${t.context.port}${route}`, httpConfig);
};

test('Should do a basic redirect', async t => {
	t.context.app.listen(t.context.port);
	const {headers} = await get(t, '/test');
	t.is(headers.location, 'https://google.com/test');
});

test('Should allow for middleware', async t => {
	t.context.app.get('/intercept', (request, response) => {
		response.end('intercepted');
	});
	t.context.app.listen(t.context.port);

	const {body} = await get(t, '/intercept');
	t.is(body, 'intercepted');

	const {headers} = await get(t, '/test');
	t.is(headers.location, 'https://google.com/test');
});
