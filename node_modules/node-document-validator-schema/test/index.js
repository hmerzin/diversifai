
var Validator = require('node-document-validator');

module.exports = Validator.Spec('Schema', {
  module: require('..'),
  engine: require('schema')('default', {env: 'default'}),
  options: {
    env: 'default'
  }
});
