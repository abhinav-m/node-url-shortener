const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
// TODO: Wrap in promise.
const connect = dbName => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return err;
    }
    const db = client.db(dbName);
    return db;
  });
};

module.exports = {
  connect
};
