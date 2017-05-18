var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

var Validator = require('../lib/'),
    validator = new Validator();

module.exports = {

  'Validator': {
    'new': {
      '()': function() {
        assert.instanceOf ( validator, require('../lib/') );

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

    '.name': function() {
      assert.property ( Validator, 'name' );
      assert.equal ( Validator.name, 'Validator' );
    },

    '.defaults': function() {
      assert.property ( Validator, 'defaults' );

      assert.typeOf ( Validator.defaults.options, 'object' );
    },

    '.options': function() {
      assert.property ( Validator, 'options' );
      assert.typeOf ( Validator.options, 'null' );
    },

    '.reset()': function() {
      assert.property ( Validator, 'reset' );
      assert.typeOf ( Validator.reset, 'function' );

      Validator.options = {foo: "bar"};
      assert.deepEqual ( Validator.options, {foo: "bar"} );
      assert.deepEqual ( Validator.defaults.options, {} );

      Validator.reset();

      assert.equal ( Validator.options, Validator.defaults.options );
    }
  },

  'Validator.prototype': {
    '#name': function() {
      assert.property ( validator, 'name' );
      assert.equal ( validator.name, 'Validator' );
    },

    '#options': function() {
      assert.property ( validator, 'options' );
      assert.typeOf ( validator.options, 'object' );
    },

    '#engine': function() {
      assert.property ( validator, 'engine' );
      assert.typeOf ( validator.engine, 'null' );
    },

    '#validate': function() {
      assert.property ( validator, 'validate' );
      assert.typeOf ( validator.validate, 'function' );
      assert.throws ( validator.validate, Error );
    },

    'Interface': {
      '#_validate': function(done) {
        assert.property ( validator, 'validate' );
        assert.typeOf ( validator.validate, 'function' );

        var attributes = {
          title: 'A title'
        };

        var schema = {
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

        validator._validate([attributes, schema, done], function(_attributes, _schema, _options, _done) {
          assert.deepEqual ( _attributes, {
            title: 'A title',
            description: 'Description for "A title"',
            tags: ['foo', 'bar'],
            comments: [
              {
                text: "First.",
                moderator: true
              }
            ]
          } );

          assert.deepEqual ( _schema, {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                required: true,
                minLength: 7
              },
              description: {
                type: 'string',
                required: false,
                default: schema.description.default
              },
              tags: {
                type: 'array',
                required: false,
                items: {
                  type: 'string'
                },
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
                default: [
                  {
                    text: "First.",
                    moderator: true
                  }
                ]
              }
            }
          } );

          _done();
        });
      }
    }
  }

};
