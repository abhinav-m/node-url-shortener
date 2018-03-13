const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;

const connect = dbName => {
  MongoClient.connect(url).then((client, err) => {
    if (err) return err;
    const db = client.db(dbName);
    return db;
  });
};

module.exports = {
  connect
};
