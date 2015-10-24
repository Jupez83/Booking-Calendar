var express = require('express');

var app = express();

app.get('/Persons', function (req, res) {
  res.send('You asked persons')
})

app.listen(3000);
