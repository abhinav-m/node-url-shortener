require('./config/config.js');

const path = require('path');
const fs = require('fs');

const express = require('express');

const { getUrls } = require('./db/models/Urls');
const { verifyUrlAndIncrement } = require('./middleware/verifyAndIncrement');

const app = express();
const port = process.env.PORT || 3000;

// Simple middleware to create log file.
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log'); //eslint-disable-line
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
  let id = parseInt(req.params.id, 10);
  if (typeof id !== 'number') {
    return res.status(200).send({ error: 'Invalid url' });
  }
  getUrls
    .then(urlCollection => {
      return urlCollection.findOne({ link_num: parseInt(id, 10) });
    })
    .then(doc => {
      if (doc) {
        return res.redirect(doc.url);
      }
      return res.status(200).send({ error: 'Invalid url' });
    })
    .catch(e => res.status(200).send({ error: 'Invalid url' }));
});

// Added middleware to add counter to request.
app.get('/new/*', verifyUrlAndIncrement, (req, res) => {
  getUrls
    .then(urlCollection => {
      return urlCollection.insertOne({
        url: req.params[0],
        short_url: `https://belittle.herokuapp.com/${req.count}`,
        link_num: req.count
      });
    })
    .then(doc => {
      const { url, short_url } = doc.ops[0]; //eslint-disable-line
      return res.status(200).send(JSON.stringify({ url, short_url }));
    })
    .catch(e => {
      return res.send(JSON.stringify({ error: 'Server error.' }));
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`); //eslint-disable-line
});
