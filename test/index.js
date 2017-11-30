const {https, cors} = require('..');
const assert = require('assert');
const sinon = require('sinon');

const httpsMiddleware = https();
const corsMiddleware = cors();

const nextCors = sinon.spy();
const resCors = {headers: {}, setHeader: (k, v) => resCors.headers[k] = v};
corsMiddleware({headers: {origin: 'localhost:3000'}, method: 'GET'}, resCors, nextCors);
assert(nextCors.calledOnce);
assert.equal(resCors.headers['Access-Control-Allow-Origin'], '*');
console.log('✅ cors passed');


const redirect = sinon.spy();
httpsMiddleware({headers: {}, method: 'GET'}, {redirect});
assert(redirect.calledOnce);

const nextHttps = sinon.spy();
httpsMiddleware({headers: {host: 'localhost:3000'}, method: 'GET'}, {}, nextHttps);
assert(nextHttps.calledOnce);

console.log('✅ https passed');
