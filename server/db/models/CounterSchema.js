const schema = {
  bsonType: 'object',
  required: ['_id', 'count'],
  properties: {
    _id: { bsonType: 'string', description: 'must be a string and required.' },
    count: { bsonType: 'int', description: 'must be an integer and required.' }
  }
};

module.exports = {
  schema
};
