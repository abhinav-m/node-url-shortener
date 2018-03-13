require('./config/config.js');

const path = require('path');
const fs = require('fs');

const express = require('express');
const { isWebUri } = require('valid-url');

const app = express();

// Middleware to use json in server.
// app.use(bodyParser.json());

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

app.get('/:id', (req, res) => {
  /* TODO: Fetch shortened url from db.
  If it doesn't exist send back response (url doesnt exist in database.) */
  const id = req.params.id;
  res.status(200).send(id);
});

app.get('/new/*', (req, res) => {
  /* https?:\/\/(www.)?([a-zA-Z0-9\-]){2,256}[\.]([a-z0-9]){2,6}
  A regex like this would work for simple urls, but alot of
  edge cases exist. */
  const url = req.params[0];
  console.log(req.params);
  console.log(url);
  if (isWebUri(url)) {
    res.send(200);
  } else {
    res.send(JSON.stringify({ error: 'Please submit a valid url.' }));
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
