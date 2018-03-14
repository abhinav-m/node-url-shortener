const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/Belittl-dev';

const schema = {
  bsonType: 'object',
  required: ['url', 'shortened_url', 'link_num'],
  properties: {
    url: { bsonType: 'string', description: 'must be a string and is required' },
    shortened_url: { bsonType: 'string', description: 'must be a string and is required' },
    link_num: { bsonType: 'int', description: 'must be a string and is required' }
  }
};

const connect = dbName => {
  return MongoClient.connect(url).then((client, err) => {
    if (err) return err;
    const db = client.db(dbName);
    return db;
  });
};

connect('Belittl-dev')
  .then(db =>
    db.createCollection('Urls', {
      validator: {
        $jsonSchema: schema
      }
    }))
  .then(collection =>
    collection.insertOne({
      url: 'www.google.com',
      shortened_url: 'localhost:3000/1234',
      link_num: 1234
    }))
  .then(doc => console.log(doc));

// const getCollection = () => {
//   return connect('Belittl-dev').then(db => {
//     return
//   });
// };

// getCollection
//   .then(urlCollection => {
//     const data = {
//       url: 'www.google.com',
//       shortened_url: 'localhost:3000/1234',
//       link_num: 1234
//     };

//     return urlCollection.insertOne(data);
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => console.log(e));
