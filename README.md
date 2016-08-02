# guidepost

> 

## Installation

```
npm install --save guidepost
```

## Usage

```js
const guidepost = require('guidepost');
let app = guidepost('https://google.com')
app.listen(80);
```
All requests coming into port 80 will be redirected to https://google.com, preserving the URL path.


## Why?

This redirector returns a
