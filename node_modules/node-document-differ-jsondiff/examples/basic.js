var Differ = require('../');

var differ = new Differ();

var a = {foo: 1, bar: "baz"},
    b = {foo: 2, baz: "qux"};

differ.diff(a, b, function(err, diff, identical) {
  console.log("Equal: %s  \nDiff:\n", identical, diff);

  process.exit(1);
});
