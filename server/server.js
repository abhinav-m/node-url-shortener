const path = require('path');
const fs = require('fs');

// const bodyParser = require('body-parser');
const express = require('express');

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
  // TODO: Fetch shortened url from db.
  const id = req.params.id;
  res.status(200).send(id);
});

app.get('/new/:url', (req, res) => {
  // TODO: Check if url is correct, if it is create record in db and send back response.
  // If not, send back error json response.
  const url = req.params.url;
  res.status(200).send(url);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
