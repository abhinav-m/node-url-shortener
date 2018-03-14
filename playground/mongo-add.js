const { getCollection } = require('./mongodb-collection');

getCollection
  .then(urlCollection => {
    const data = {
      url: 'www.google.com',
      shortened_url: 'localhost:3000/1234',
      link_num: 1234
    };

    return urlCollection.insertOne(data);
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => console.log(e));
