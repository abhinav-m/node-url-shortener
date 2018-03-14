require('./config/config.js');

const path = require('path');
const fs = require('fs');

const express = require('express');
const { isWebUri } = require('valid-url');
const { ObjectID } = require('mongodb');

const { getUrls } = require('./db/models/Urls');

const app = express();

// Middleware to use json in server.

// Simple middleware to create log file.
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => {
  res.status(204).send();
});

app.get('/:id', (req, res) => {
  /* TODO: Add a real shortened url instead of using id as the alternate short url */
  console.log(req.params.id);
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.send(404);
  }

  getUrls
    .then(urlCollection => {
      // Remember to wrap id in ObjectID.
      return urlCollection.findOne({ _id: ObjectID(id) });
    })
    .then(doc => {
      if (doc) {
        res.redirect(doc.url);
      } else {
        res.status(200).send({ error: 'Invalid url' });
      }
    })
    .catch(e => res.status(200).send({ error: 'Invalid url' }));
});

app.get('/new/*', (req, res) => {
  /* https?:\/\/(www.)?([a-zA-Z0-9\-]){2,256}[\.]([a-z0-9]){2,6}
  A regex like this would work for simple urls, but alot of
  edge cases exist. */
  const url = req.params[0];
  if (isWebUri(url)) {
    // To refer to id in the shortened url
    const id = new ObjectID();
    getUrls
      .then(urlCollection => {
        return urlCollection.insertOne({
          _id: id,
          url,
          short_url: `localhost:3000/${id.toHexString()}`, // eslint-disable-line
          link_num: 1
        });
      })
      .then(doc => {
        const { url, short_url } = doc.ops[0];
        res.status(200).send(JSON.stringify({ url, short_url }));
      })
      .catch(e => {
        console.log(e);
        res.send(JSON.stringify({ error: 'Please submit a valid url.' }));
      });
  } else {
    res.send(JSON.stringify({ error: 'Please submit a valid url.' }));
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
