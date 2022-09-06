const mongoose = require('mongoose');
const storeSchema = require('../models/store').schema

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide your name'],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    store: {
      type: [storeSchema],
      required: [true, 'Please provide store'],
    },
    pickup: {
      type: Boolean,
      required: [true, 'Please select an option'],

    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);