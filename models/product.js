const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },

},
{ timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
