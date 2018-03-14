const { isWebUri } = require('valid-url');

const { getCounter } = require('../db/models/Counter');

const verifyUrlAndIncrement = (req, res, next) => {
  /* https?:\/\/(www.)?([a-zA-Z0-9\-]){2,256}[\.]([a-z0-9]){2,6}
  A regex like this would work for simple urls, but alot of
  edge cases exist. */
  const reqUrl = req.params[0];
  if (!isWebUri(reqUrl)) {
    return res.send(JSON.stringify({ error: 'Please submit a valid url.' }));
  }

  getCounter().then(counter => {
    counter
      .findOneAndUpdate(
        {
          _id: 'counter'
        },
        {
          $inc: { count: 1 }
        },
        // Insert if not present , return new document.
        { upsert: true, returnOriginal: false }
      )
      .then(doc => {
        if (!doc) {
          // Reject promise in middleware, send 401 back.
          return Promise.reject();
        }
        req.count = doc.value.count;
        next();
      })
      .catch(e => res.status(401).send(e.message));
  });
};

module.exports = {
  verifyUrlAndIncrement
};
