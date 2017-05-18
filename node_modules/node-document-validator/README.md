# NODE-DOCUMENT-VALIDATOR [![Build Status](https://secure.travis-ci.org/grimen/node-document-validator.png)](http://travis-ci.org/grimen/node-document-validator)

**Validator** adapter interface for [node-document](https://github.com/grimen/node-document) ODM for Node.js.

## About

Unified interface for validating data based on a custom JSON Schema.


## Adapters

* [Amanda](https://github.com/grimen/node-document-validator-amanda)
* [Schema.js](https://github.com/grimen/node-document-validator-schema)
* [JSONGate](https://github.com/grimen/node-document-validator-jsongate)
* [JSONSchema](https://github.com/grimen/node-document-validator-jsonschema)
* [JSV](https://github.com/grimen/node-document-validator-jsv)


## API

### `#validate`

* `(data, schema, [callback(err, res)])`

    ```javascript
    validator.validate({foo: 'bar'}, {foo: {type: 'string', required: true}}, function(err, res) {
      // console.log(arguments);
    });
    ```


## Installation

```shell
  $ npm install node-document-validator
```


## Usage

For details; see [node-document](https://github.com/grimen/node-document).


## Test

**Local tests:**

```shell
  $ make test
```


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)
