const express = require('express');
const app = express();

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/blog', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/blog/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/search', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/contact', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// Start the app by listening on the default
app.listen(8080, () => {
  console.log('Eronir Nobre APP is running in port 8080');
  });