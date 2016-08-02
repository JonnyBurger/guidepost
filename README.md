# guidepost [![Build Status](https://travis-ci.org/JonnyBurger/guidepost.svg?branch=master)](https://travis-ci.org/JonnyBurger/guidepost)

> Redirect all requests to another domain Redirect all requests to another domain

## Installation

```
npm install --save guidepost
```

## Usage

```js
const guidepost = require('guidepost');

const app = guidepost('https://google.com')
app.listen(80);
```
All requests coming into port 80 will be redirected to https://google.com, preserving the URL path.


## Why?

This redirector returns an express app, so you can pass it to `http.createServer()` or `https.createServer()`.
This way you have full control over ports, SSL certificates, adding routing and middleware, but still need very little configuration!

## Advanced Examples

HTTPS server using [`https.createServer()`](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener):
```js
const https = require('https');
const guidepost = require('guidepost');

const app = guidepost('https://google.com');
https.createServer({
	key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
	cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
}, app).listen(80);
```

Make an exception to redirecting:
```js
const app = guidepost('https://google.com');
app.get('/test', (request, response) => {
	response.end('No redirect!');
});
app.listen(80);
// '/test' ==> 'http://localhost:80/test'
// '/test2' ==> 'https://google.com/test2' 
```

Log all requests:
```js
const app = guidepost('https://google.com');
app.use((request, response, next) => {
	console.log(`${request.url} was requested`);
	next();
});
app.listen(80)
```

## How does it work?
_guidepost_ uses a ES6 proxy to only add the redirect handler at the very end of the express router.
This is why you can add middleware after you have called `guidepost()`.

## Support
Only node >= 6.0.0 is supported because the module makes use of proxies.

## License

ISC @ [Jonny Burger](http://jonny.io)
