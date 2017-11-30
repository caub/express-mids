/**
 * HTTPS middleware
 * @param  options: 
 *  - EXCLUDE_HOSTS regexp, defaults to /^localhost:/
 * @return middleware function
 */
module.exports = ({EXCLUDE_HOSTS = /^localhost:/} = {}) => (req, res, next) => {
	const proto = req.headers['x-forwarded-proto'] || '';
	const isHttps = req.secure || proto.startsWith('https') || EXCLUDE_HOSTS.test(req.headers.host);
	if (!isHttps && (req.method === 'GET' || req.method === 'HEAD')) {
		return res.redirect(308, 'https://' + req.headers.host + req.originalUrl);
	}
	next();
};
