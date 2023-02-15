const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs');
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Note Title is Compulsory"],
    },
    category: {
      type: String,
      required: [true, "Category is Compulsory"],
    },
    description: {
      type: String,
      required: [true, "Description is Compulsory"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", noteSchema);
