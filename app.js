var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var swig = require('swig');
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

//connect to router
app.use('/products', require('./routes'));

//setup server
app.listen(3000, function(){
  console.log('server listening');

});

app.get('/', function( req, res, next){
  res.render('index');

});
