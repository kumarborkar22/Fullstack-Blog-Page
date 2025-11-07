const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 120,
  },
  imageURL: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Invalid URL format.',
    },
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
  },
  username: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);