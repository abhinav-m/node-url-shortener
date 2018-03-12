const { addUrl } = require('./mongodb-insert');

addUrl({
  url: 'www.google.com',
  shortened_url: 'localhost:3000/1234',
  link_num: 1234
}).then(url => console.log(url));
