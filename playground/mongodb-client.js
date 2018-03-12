const { MongoClient } = require('mongodb');

// TODO: Wrap in promise.
// const connect = dbName => {
const url = 'mongodb://localhost:27017/Belittl-dev';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err);
  }
  const db = client.db('Belittl-dev');

  db
    .createCollection('Urls', {
      validator: {
        $and: [
          {
            url: { $type: 'String', $exists: true }
          },
          {
            shortened_url: { $type: 'String', $exists: true }
          },
          {
            link_num: { $type: 'int', unique: true, $exists: true }
          }
        ]
      }
    })
    .then(urlCollection => {
      const data = {
        shortened_url: 'localhost:3000/1234',
        link_num: 1234
      };
      return urlCollection.insertOne(data);
    })
    .then(inserted => console.log(inserted))
    .catch(e => console.log(e));
});
// };

// module.exports = {
//   connect
// };

// const { addUrl } = require('./mongodb-insert');

// addUrl().then(url => console.log(url));
