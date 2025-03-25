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
  }, 
    sender: {
      type: mongoose.Schema.Types.Mixed,
      index: true,
      default: ""
    }
  
}, {
  timestamps: true
})

const Note = mongoose.model("note", noteSchema);

module.exports = { Note };