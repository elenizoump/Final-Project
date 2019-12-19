const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Note = mongoose.model("Note", schema);

module.exports = Note;
