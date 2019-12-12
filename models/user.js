"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Teacher", "Student"]
  },
  description: {
    type: String
  },

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

  address: [
    {
      streetname: {
        type: String,
        required: true
      },
      postcode: {
        type: Number,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      houseNumber: {
        type: Number,
        required: true
      }
    }
  ],

  image: {
    type: String
  },
  levels: [
    {
      name: {
        type: [String],
        enum: ["Beginner", "Intermediate", "Advanced"]
      },
      price: {
        type: Number,
        min: 10,
        max: 100
      }
    }
  ],
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  age: {
    type: Number
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

module.exports = mongoose.model("User", schema);
