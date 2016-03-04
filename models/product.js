var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northwind_db');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var Schema = mongoose.Schema;

productSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  numInStock: {type: Number, default: 10},
  active: {type: Boolean, default: true},
  lastUpdated: {type: Date, default: Date.now}

});

//pre-save middleware
productSchema.pre('save', function(next){
  this.lastUpdatedAt = Date.now();
  next();
});

productSchema.statics.findActive = function(){
  return this.find({active: true});
};

productSchema.statics.findInactive = function(){
  return this.find({active: false});
};


var Product = mongoose.model('Product', productSchema);
module.exports = Product;
