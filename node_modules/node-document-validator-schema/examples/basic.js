var Validator = require('..');

var validator = new Validator();

var data = {
  foo: "foo",
  bar: 123,
  baz: undefined
};

var schema = {
  foo: {
    type: "string",
    minLength: 4
  },
  bar: {
    type: "number"
  },
  baz: {
    required: true
  }
};

validator.validate(data, schema, function(err, errors, valid) {
  console.log("Valid: %s  \nErrors:\n", valid, errors);

  process.exit(1);
});
