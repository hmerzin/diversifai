require('sugar');
var fun = require('funargs');

// -----------------------
//  Constructor
// --------------------

// new Validator ()
// new Validator (options)
function Validator () {
  var self = this, args = fun(arguments);

  self.klass = self.klass || Validator;

  self.options = Object.merge(self.klass.defaults.options, args.objects()[0] || {}, true);
  self.engine = null;
}

// -----------------------
//  Class
// --------------------

// .name
Validator.__defineGetter__('name', function() {
  return this.name;
});

Validator.defaults = {
  options: {}
};

Validator.options = null;

Validator.reset = function() {
  var self = this;

  if (self.defaults) {
    self.options = self.defaults.options;
  }
};

// -----------------------
//  Instance
// --------------------

// #name
Validator.prototype.__defineGetter__('name', function() {
  return this.constructor.name;
});

// #_validate ()
Validator.prototype._validate = function(args, execute) {
  var self = this, attributes, schema, options, callback;

  args = fun(args);
  attributes = args.objects()[0];
  schema = args.objects()[1] || {};
  options = Object.merge(self.options, args.objects()[2] || {}, true);
  callback = args.functions()[0];

  if (!Object.isObject(attributes)) {
    throw new Error("ArgumentError: Expected `attributes` <object>, got <" + typeof attributes + ">");
  }

  if (!Object.isObject(schema)) {
    throw new Error("ArgumentError: Expected `schema` <object>, got <" + typeof schema + ">");
  }

  // Support both explicit JSON Schema and implicit.
  if (schema.type && schema.properties) {
    schema = schema;
  } else {
    schema = {
      type: 'object',
      properties: schema
    };
  }

  var eval_default = function(_doc, _schema) {
    if (typeof _schema.default === 'function') {
      _schema.default = _schema.default.call(_doc);
    }
    return _schema.default;
  };

  var eval_defaults = function(_doc, _attributes, _schema) {
    if (_schema.type === 'object' || _schema.properties) { // object
      Object.keys(_schema.properties || {}).each(function(k) {
        if (!_attributes[k]) {
          _attributes[k] = eval_default(_doc, _schema.properties[k]);
        }

        if (_schema.properties[k].properties || _schema.properties[k].items) { // object or array
          _attributes[k] = eval_defaults(_doc, _attributes[k], _schema.properties[k]);
        }
      });
    } else if (_schema.type === 'array' || _schema.items) { // array
      _attributes = _attributes.map(function(_attributes) {
        return eval_defaults(_doc, _attributes, _schema.items)
      });
    }
    return _attributes;
  };

  attributes = eval_defaults(attributes, attributes, schema)

  var done = function(errors, valid) {
    if (callback) {
      callback(null, errors, valid);
    }
  };

  try {
    execute(attributes, schema, options, done);

  } catch (err) {
    if (callback) {
      callback(err);
    } else {
      throw err;
    }
  }

  // if (!callback) {
  //   var result;
  //   // TODO: Sync:ed call
  //   return result;
  // }
}

// #validate (attributes)
// #validate (attributes, options)
// #validate (attributes, callback)
// #validate (attributes, options, callback)
Validator.prototype.validate = function() {
  throw new Error("Not implemented");
}

// -----------------------
//  Export
// --------------------

Validator.Spec = require('../test/adapter_spec');

module.exports = Validator;

