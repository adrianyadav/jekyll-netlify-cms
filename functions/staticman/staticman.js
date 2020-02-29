const qs = require('qs');
const UrlPattern = require('url-pattern');
const pattern = new UrlPattern(
	'/.netlify/functions/staticman/:username/:repository/:branch/:property'
);

let urlParams = '';
let staticman = '';
let params = {
	...urlParams,
	// staticman lib has different logic per version. Lock it to 2
	version: '2'
};
let body = '';
let options = '';

exports.handler = (event, context, callback) => {
	params = {
		...urlParams,
		// staticman lib has different logic per version. Lock it to 2
		version: '2'
	};

	urlParams = pattern.match(event.path);
	staticman = new Staticman(params);
	staticman.setConfigPath();
	staticman.setIp(event.headers['client-ip']);
	staticman.setUserAgent(event.headers['user-agent']);
	body = qs.parse(event.body);
	let options = body.options || {};
};
try {
	const StaticmanAPI = require('staticman/lib/Staticman');
	const api = new StaticmanAPI(params);

	api.start(port => {
		console.log('Staticman API running on port', port);
	});
} catch (e) {
	console.error(e);
}
