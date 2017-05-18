# NODE-DOCUMENT-DIFFER-JSONDIFF [![Build Status](https://secure.travis-ci.org/grimen/node-document-differ-jsondiff.png)](http://travis-ci.org/grimen/node-document-differ-jsondiff)

**Differ** adapter [json-diff](https://github.com/flitbit/diff) for [node-document](https://github.com/grimen/node-document) ODM for Node.js.


## Installation

```shell
  $ npm install node-document-differ-jsondiff
```


## Usage

**Basic:**

```javascript
  var Differ = require('node-document-differ-jsondiff');

  var differ = new Differ();

  var a = {foo: 1, bar: "baz"},
      b = {foo: 2, baz: "qux"};

  differ.diff(a, b, function(err, diff, identical) {
    console.log("Equal: %s  \nDiff:\n", identical, diff);
  });
```

For details; see [node-document](https://github.com/grimen/node-document).


## Test

**Local tests:**

```shell
  $ make test
```


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)
