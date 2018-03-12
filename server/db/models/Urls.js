const { connect } = require('./client.js');

const db = connect(process.env.DB_NAME);

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

const addUrl = url => urlCollection.insertOne(url);

module.exports = {
  addUrl
};
