const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide store name'],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    address: {
      type: String,
      required: [true, 'Please provide store address'],
      maxlength: [50, 'Adress can not be more than 50 characters'],
    },
    city: {
      type: String,
      required: [true, 'Please provide store city'],
      maxlength: [50, 'City can not be more than 50 characters'],
    },
    openingHours: {
        type: String,
        required: [true, 'Please provide store opening hours'],
        maxlength: [1000, 'Opening hours can not be more than 1000 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', StoreSchema);