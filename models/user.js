"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["teacher", "student"]
  },
  description: {
    type: String
  },
  calendar: [
    {
      type: mongoose.Types.ObjectId,
      ref: "availableDays"
    }
  ],
  name: {
    type: String,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHash: {
    type: String
  },

  address: [
    {
      streetname: {
        type: String
      },
      postcode: {
        type: Number
      },
      city: {
        type: String
      },
      houseNumber: {
        type: Number
      }
    }
  ],

  image: {
    type: String
  },
  levelsname: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },
  levelsprice: {
    type: Number,
    min: 10,
    max: 100
  },
  age: {
    type: Number
  },
  city: {
    type: String
  },
  popularity: {
    type: Number
  },
  instrumentname: {
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
});

module.exports = mongoose.model("User", schema);
