"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  availableDays: [
    {
      type: Date
    }
  ],
  instrument: String
});

module.exports = mongoose.model("Calendar", schema);
