const { connect } = require('../client.js');
const { schema } = require('./UrlSchema');

const getUrls = connect(process.env.DB_NAME).then(db => {
  return db.createCollection('Urls', {
    validator: {
      $jsonSchema: schema
    }
  });
});

module.exports = {
  getUrls
};
