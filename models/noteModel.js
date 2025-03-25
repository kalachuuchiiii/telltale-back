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
      type: mongoose.Schema.Types.ObjectId, 
      index: true
    }
  
}, {
  timestamps: true
})

const Note = mongoose.model("note", noteSchema);

module.exports = { Note };