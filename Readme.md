# Express-mids

A collection of express middlewares

```js
const express = require('express');
const {https, cors} = require('express-mids');

express().disable('x-powered-by') // meh
	.use(https())
	.use(cors({
		ORIGINS: /\/hello.world$|\/localhost:\d+$/
	}))
	.listen(process.env.PORT || 3000);
```