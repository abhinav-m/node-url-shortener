const schema = require('./CounterSchema');
const { connect } = require('../client.js');

const getCounter = () => {
  return connect(process.env.DB_NAME).then(db => {
    const validator = {
      validator: {
        $jsonSchema: schema
      }
    };
    return db.collection('counter') || db.createCollection('counter', validator);
  });
};
module.exports = {
  getCounter
};
