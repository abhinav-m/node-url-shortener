const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/Belittl-dev';

const connect = dbName => {
  return MongoClient.connect(url).then((client, err) => {
    if (err) return err;
    const db = client.db(dbName);
    return db;
  });
};

module.exports = {
  connect
};
