# NODE-DOCUMENT-DIFFER [![Build Status](https://secure.travis-ci.org/grimen/node-document-differ.png)](http://travis-ci.org/grimen/node-document-differ)

**Differ** adapter interface for [node-document](https://github.com/grimen/node-document) ODM for Node.js.


## About

Unified interface for diffing objects to see changes between the two (additions/removals/edits).


## Adapters

* [DeepDiff](https://github.com/grimen/node-document-differ-deepdiff)
* [JSONDiff](https://github.com/grimen/node-document-differ-jsondiff)
* [ObjectDiff](https://github.com/grimen/node-document-differ-objectdiff)
* [Patcher.js](https://github.com/grimen/node-document-differ-patcher)


## API

### `#diff`

* `(a, b, [callback(err, res)])`

    ```javascript
    differ.diff({foo: 'bar'}, {foo: 'baz', bar: 1}, function(err, res) {
      // console.log(arguments);
    });
    ```


## Installation

```shell
  $ npm install node-document-differ
```


## Test

**Local tests:**

```shell
  $ make test
```


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)
