
// -----------------------
//  Test
// --------------------

var Storage = require('node-document-storage');

module.exports = Storage.Spec('Global', {
  module: require('..'),
  engine: global,
  id: 'global',
  protocol: null,
  db: 'default-test',
  default_url: 'global:///default-test',
  authorized_url: undefined,
  unauthorized_url: undefined,
  client: {
    get: function(db, type, id, callback) {
      var key = [db, type, id].join('/');

      var client = new (require('..')).Client();

      client.get(key, function(err, res) {
        callback(err, res);
      });
    },

    set: function(db, type, id, data, callback) {
      var key = [db, type, id].join('/');

      var client = new (require('..')).Client();

      client.set(key, data, function(err, res) {
        callback(err, res);
      });
    },

    del: function(db, type, id, callback) {
      var key = [db, type, id].join('/');

      var client = new (require('..')).Client();

      client.del(key, function(err, res) {
        callback(err, res);
      });
    }
  }
});
