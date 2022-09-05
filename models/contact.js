const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide your name'],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    mail: {
        type: String,
        required: [true, 'Please provide your email address'],
        maxlength: [50, 'Email address can not be more than 50 characters'],
      },
    subject: {
      type: String,
      required: [true, 'Please provide the subject'],
      maxlength: [100, 'Subject can not be more than 100 characters'],
    },
    comment: {
        type: String,
        required: [true, 'Please provide comment'],
        maxlength: [1000, 'Comment can not be more than 1000 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);