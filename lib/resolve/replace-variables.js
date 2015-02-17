'use strict';

var resolveExpression = require('./resolve-expression');

module.exports = replaceVariables;

function replaceVariables(marker, config, values, opts) {
	return resolve('', config, marker, values, opts || {});
}

function resolve(prop, config, marker, values, opts) {
	var result;
	if (typeof config === 'string') {
		result = resolveExpression(prop, config, marker, values, opts);
	} else if (Array.isArray(config)) {
		result = [];
		prop += prop.length ? '.' : '';
		config.forEach(function(item, idx) {
			result.push(resolve(prop + idx, item, marker, values, opts));
		});
	} else if (typeof config === 'object') {
		result = {};
		prop += prop.length ? '.' : '';
		Object.keys(config).forEach(function(key) {
			result[key] = resolve(prop + key, config[key], marker, values, opts);
		});
	} else {
		result = config;
	}
	return result;
}
