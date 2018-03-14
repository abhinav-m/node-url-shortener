const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;

const connect = dbName => {
  return MongoClient.connect(url)
    .then(client => {
      const db = client.db(dbName);
      return db;
    })
    .catch(e => console.log(e));
};

module.exports = {
  connect
};
