var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));



//setup server
app.listen(3000, function(){
  console.log('server listening');

});
