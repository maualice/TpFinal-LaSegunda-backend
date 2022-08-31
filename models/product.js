const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide brand'],
      enum: {
        values: ['genius', 'logitech', 'kingston'],
        message: '{VALUE} is not supported',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
