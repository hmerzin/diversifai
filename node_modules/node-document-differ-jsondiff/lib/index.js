require('sugar');
var util = require('util');

// HACK: ...until Node.js `require` supports `instanceof` on modules loaded more than once. (bug in Node.js)
var Differ = global.NodeDocumentDiffer || (global.NodeDocumentDiffer = require('node-document-differ'));

// -----------------------
//  DOCS
// --------------------
//  - https://github.com/andreyvit/json-diff

// -----------------------
//  Constructor
// --------------------

// new JSONDiff ()
// new JSONDiff (options)
function JSONDiff () {
  var self = this

  self.klass = JSONDiff;
  self.klass.super_.apply(self, arguments);

  self.engine = require('json-diff');
}

util.inherits(JSONDiff, Differ);

// -----------------------
//  Class
// --------------------

JSONDiff.defaults = {
  options: {}
};

JSONDiff.options = Object.clone(JSONDiff.defaults.options, true);

JSONDiff.reset = Differ.reset;

// -----------------------
//  Instance
// --------------------

// #diff (a, b)
// #diff (a, b, options)
// #diff (a, b, callback)
// #diff (a, b, options, callback)
JSONDiff.prototype.diff = function() {
  var self = this;

  self._diff(arguments, function(a, b, options, done) {
    var diff = self.engine.diff(a, b) || null;
    var identical = Object.isEmpty(diff || {});

    done(diff, identical);
  });
}

// -----------------------
//  Export
// --------------------

module.exports = JSONDiff;
