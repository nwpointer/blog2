var stringify = require('json-stringify-safe');

module.exports = function (content) {
  	return stringify(content, null, 3)
}