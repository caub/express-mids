/**
 * CORS middleware
 * @param  options: 
 *  - ORIGINS regexp, default to /\/localhost:\d+$/
 * @return middleware function
 */
module.exports = ({ORIGINS = /\/localhost:\d+$/} = {}) => (req, res, next) => {
	const origin = req.headers.origin;
	const isAllowed = ORIGINS.test(origin);
	res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : '*');
	res.setHeader('Access-Control-Allow-Credentials', isAllowed);

	if (req.method.toUpperCase() === 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,SEARCH,POST,DELETE');
		res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
		res.setHeader('Access-Control-Max-Age', '86400');
		return res.status(204).end();
	}
	next();
};
