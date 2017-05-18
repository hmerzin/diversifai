
var Differ = require('node-document-differ');

module.exports = Differ.Spec('JSONDiff', {
  module: require('..'),
  engine: require('json-diff'),
  options: {}
});
