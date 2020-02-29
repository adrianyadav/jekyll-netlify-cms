const qs = require('qs');
const UrlPattern = require('url-pattern');
const Staticman = require('staticman/lib/Staticman');

const pattern = new UrlPattern(
	'/.netlify/functions/staticman/:username/:repository/:branch/:property'
);

exports.handler = (event, context, callback) => {
	const urlParams = pattern.match(event.path);
	const params = {
		...urlParams,
		// staticman lib has different logic per version. Lock it to 2
		version: '2'
	};

	const staticman = new Staticman(params);

	const body = qs.parse(event.body);
	const options = body.options || {};

	staticman.start(port => {
		console.log('Staticman API running on port', port);
	});
};
