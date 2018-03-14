const { connect } = require('../client.js');
const { schema } = require('./UrlSchema');

const getUrls = connect(process.env.DB_NAME)
  .then(db => {
    const validator = {
      validator: {
        $jsonSchema: schema
      }
    };
    // Check if collection exists and return it if it exists , else create and return it
    return db.collection('Urls') || db.createCollection('Urls', validator);
  })
  .catch(e => console.log(e));

module.exports = {
  getUrls
};
