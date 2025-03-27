const mongoose = require("mongoose");

const specificNoteSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "user"
  },
  message: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
})

const SpecificNote = mongoose.model("specificNote", specificNoteSchema);

module.exports = { SpecificNote };