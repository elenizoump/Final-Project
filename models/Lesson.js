"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Pending", "Booked"]
  }
});

module.exports = mongoose.model("Lesson", schema);
