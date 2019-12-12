"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  adress: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  city: {
    type: String
  },
  instruments: [
    {
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"]
      },
      name: {
        type: String,
        enum: [
          "Piano",
          "Guitar",
          "Violin",
          "Drums",
          "Saxophone",
          "Flute",
          "Clarinet",
          "Cello",
          "Vocals"
        ]
      }
    }
  ]
});

module.exports = mongoose.model("Student", schema);
