const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  receiver: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    index: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
})

const Note = mongoose.model("note", noteSchema);

module.exports = { Note };