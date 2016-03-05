var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northwind_db');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var Schema = mongoose.Schema;

productSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  numInStock: {type: Number},
  active: {type: Boolean, default: true},
  lastUpdated: {type: Date, default: Date.now}

});

//pre-save middleware
productSchema.pre('save', function(next){
  this.lastUpdatedAt = Date.now();
  next();
});

productSchema.pre('validate', function (next) {
  if(!this.name){
    this.name = 'Super Cool Product No. ' + Math.floor(Math.random() * 100);
  }

  if(!this.description){
    this.description = 'Description for ' +this.name;
  }

  this.numInStock = Math.floor(Math.random() * 100);
});


productSchema.statics.findActive = function(){
  return this.find({active: true});
};

productSchema.statics.findInactive = function(){
  return this.find({active: false});
};


var Product = mongoose.model('Product', productSchema);
module.exports = Product;
