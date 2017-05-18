var helper = require('./helper'),
    assert = helper.assert,
    diff = helper.diff,
    debug = helper.debug;

// -----------------------
//  Spec: Validator
// --------------------

module.exports = function(name, spec) {
  var Validator = spec.module;
  var engine = spec.engine;
  var options = spec.options || {};

  var validator, schema;

  return (function() {
    var Spec = {};

    Spec.before = function() {
      validator = new Validator();
    };

    Spec[name] = {
      'new': {
        '()': function() {
          assert.equal ( validator.name, name );

          Validator.reset();

          var validator2 = new Validator();

          assert.equal ( validator2.url, null );
          assert.typeOf ( validator2.options, 'object' );
          assert.deepEqual ( validator2.options.custom, undefined );
        },

        '(options)': function() {
          Validator.reset();

          var validator2 = new Validator({custom: {foo: 'bar'}});

          assert.equal ( validator2.url, null );
          assert.typeOf ( validator2.options, 'object' );
          assert.deepEqual ( validator2.options.custom, {foo: 'bar'} );
        }
      },

      '.klass': function() {
        assert.property ( validator, 'klass' );
        assert.equal ( validator.klass, Validator );
      },

      '.defaults': function() {
        assert.property ( Validator, 'defaults' );

        assert.equal ( Validator.defaults.url, null );
        assert.typeOf ( Validator.defaults.options, 'object' );
      },

      '.options': function() {
        assert.property ( Validator, 'options' );
        assert.typeOf ( Validator.options, 'object' );
        assert.deepEqual ( Validator.options, options );
      },

      '.reset()': function() {
        assert.property ( Validator, 'reset' );
        assert.typeOf ( Validator.reset, 'function' );

        Validator.options = {foo: "bar"};
        assert.deepEqual ( Validator.options, {foo: "bar"} );

        Validator.reset();

        assert.equal ( Validator.url, null );
      }
    };

    Spec[name + '.prototype'] = {
      '#options': function() {
        assert.property ( validator, 'options' );
        assert.typeOf ( validator.options, 'object' );
      },

      '#engine': function() {
        assert.property ( validator, 'engine' );
        assert.deepEqual ( validator.engine, engine );
      },

      '#validate': {
        before: function() {
          schema = {
            title: {
              type: 'string',
              required: true,
              minLength: 7
            },
            description: {
              type: 'string',
              required: false,
              default: function() { return 'Description for "' + this.title + '"'; }
            },
            tags: {
              type: 'array',
              required: false,
              items: {type: 'string'},
              default: ['foo', 'bar']
            },
            comments: {
              type: 'array',
              required: false,
              items: {
                type: 'object',
                properties: {
                  text: {
                    type: "string"
                  },
                  moderator: {
                    type: "boolean",
                    default: true
                  }
                }
              },
              default: [{text: "First."}]
            }
          };
        },

        '': function() {
          assert.property ( validator, 'validate' );
          assert.typeOf ( validator.validate, 'function' );
        },

        '(attributes, implicit_schema) - when valid data': function(done) {
          var data = {title: "A title"};
          var expected = {
            title: 'A title',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, schema, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.typeOf ( errors, 'null' );
            assert.equal ( valid, true );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, implicit_schema) - when invalid data': function(done) {
          var data = {title: "A"};
          var expected = {
            title: 'A',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, schema, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.equal ( errors.length, 1 );
            assert.equal ( valid, false );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, explicit_schema) - when valid data': function(done) {
          var data = {title: "A title"};
          var expected = {
            title: 'A title',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, {type: 'object', properties: schema}, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.typeOf ( errors, 'null' );
            assert.equal ( valid, true );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, explicit_schema) - when invalid data': function(done) {
          var data = {title: "A"};
          var expected = {
            title: 'A',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, {type: 'object', properties: schema}, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.equal ( errors.length, 1 );
            assert.equal ( valid, false );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, implicit_schema, options) - when valid data': function(done) {
          var data = {title: "A title"};
          var expected = {
            title: 'A title',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, schema, {}, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.typeOf ( errors, 'null' );
            assert.equal ( valid, true );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, implicit_schema, options) - when invalid data': function(done) {
          var data = {title: "A"};
          var expected = {
            title: 'A',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, schema, {}, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.equal ( errors.length, 1 );
            assert.equal ( valid, false );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, explicit_schema, options) - when valid data': function(done) {
          var data = {title: "A title"};
          var expected = {
            title: 'A title',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, {type: 'object', properties: schema}, {}, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.typeOf ( errors, 'null' );
            assert.equal ( valid, true );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        },

        '(attributes, explicit_schema, options) - when invalid data': function(done) {
          var data = {title: "A"};
          var expected = {
            title: 'A',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          };

          validator.validate(data, {type: 'object', properties: schema}, {}, function(err, errors, valid) {
            assert.ok ( !err, err );
            assert.equal ( errors.length, 1 );
            assert.equal ( valid, false );
            assert.deepEqual ( data, expected, diff(data, expected) );
            done();
          });
        }
      }
    };

    return Spec;
  }());
};

