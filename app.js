// global namespace
Majal = {};

Ractive = require('ractive/ractive.runtime');

// precompiled assets
require('./build/server');

var express = require('express');

var app = express();

app.use('/index.html', express.static('build/public/index.html'));
app.use('/assets', express.static('build/public/assets'));
app.use('/vendor', express.static('bower_components'));

app.get('/*', function (req, res) {
  res.send(Majal.render(req.url));
});

app.listen(8001, function () {
  console.log('Listening on http://localhost:8001');
});

process.on('SIGINT', function() {
  process.exit();
});
