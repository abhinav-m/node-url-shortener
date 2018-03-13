require('./config/config.js');

const path = require('path');
const fs = require('fs');

const express = require('express');
const { isWebUri } = require('valid-url');
const { ObjectID } = require('mongodb');
const bodyParser = require('body-parser');

const { getUrls } = require('./db/models/Urls');

const app = express();

// Middleware to use json in server.
app.use(bodyParser.json());

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
  /* TODO: Fetch shortened url from db.
  If it doesn't exist send back response (url doesnt exist in database.) */
  console.log(req.params.id);
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    console.log('id is valid');
    return res.send(404);
  }
  // TODO: Fix query by ID.
  getUrls
    .then(urlCollection => {
      return urlCollection.findOne({ _id: id });
    })
    .then(doc => {
      console.log(doc);
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
    getUrls
      .then(urlCollection => {
        const id = new ObjectID();

        return urlCollection.insertOne({
          _id: id,
          url,
          shortened_url: `localhost:3000/${id.toHexString()}`,
          link_num: 1
        });
      })
      .then(doc => {
        res.status(200).send(doc);
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
