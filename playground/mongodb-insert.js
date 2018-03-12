const { connect } = require('./mongodb-client.js');

const addUrl = url => {
  connect('Belittl-dev')
    .then(db => {
      const urlCollection = db.collection('Urls', {
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
      });
      return urlCollection.insertOne(url);
    })
    .catch(e => e);
};

module.exports = {
  addUrl
};
