const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  image: {
    type: String
  }
});

const Homework = mongoose.model('Homework', schema);

module.exports = Homework;