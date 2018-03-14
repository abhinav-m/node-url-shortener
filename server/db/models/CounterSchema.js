const schema = {
  bsonType: 'object',
  required: ['_id'],
  properties: {
    _id: { bsonType: 'int', description: 'must be an integer and is required' }
  }
};

module.exports = {
  schema
};
