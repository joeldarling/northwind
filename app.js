var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//needed?


var swig = require('swig');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

//connect to router
app.use('/products', require('./routes'));

app.get('/', function( req, res, next){
  res.render('index');

});

app.use(function(err, req, res, next){
  console.log(err);
  res.sendStatus(500);
});
//setup server
app.listen(process.env.PORT || 3000, function(){
  console.log('server listening');
});//set this up in separate file-- so you can do testing?

