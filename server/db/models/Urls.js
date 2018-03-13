const { connect } = require('./client.js');
const { schema } = require('./UrlSchema');

const db = connect(process.env.DB_NAME);

const urlCollection = db.collection('Urls', {
  validator: {
    $jsonSchema: schema
  }
});

const addUrl = url => urlCollection.insertOne(url);

module.exports = {
  addUrl
};
