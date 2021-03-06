"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  _teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ["Pending", "Booked"],
    default: "Pending"
  },
  instrument: String,
  hoursOfStudy: Number,
  comments: [{
    text: {
      type: String,
      required: true
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

module.exports = mongoose.model("Lesson", schema);
