const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  author: {
    type: String
  }
});

const Note = mongoose.model('Note', schema);

module.exports = Note;