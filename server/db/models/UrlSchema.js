const schema = {
  bsonType: 'object',
  required: ['url', 'short_url', 'link_num'],
  properties: {
    url: { bsonType: 'string', description: 'must be a string and is required' },
    short_url: { bsonType: 'string', description: 'must be a string and is required' },
    link_num: { bsonType: 'int', description: 'must be a string and is required' }
  }
};

module.exports = {
  schema
};
