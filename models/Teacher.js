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
  address: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  levels: [
    {
      name: {
        type: String,
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
  }
});

module.exports = mongoose.model("Teacher", schema);
