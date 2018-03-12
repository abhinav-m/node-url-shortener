const path = require('path');

const express = require('express');

const app = express();

// Middleware to serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/api/:id', (req, res) => {});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
