const { SpecificNote } = require("../models/specificNote.js");
const mongoose = require("mongoose");


const sendNote = async(req, res) => {
  const { id, message } = req.body; 
  if(!id || !message || !(await mongoose.Types.ObjectId.isValid(id))){
    return res.status(404).json({
      success: false,
      message: "Ensure you're sending the correct person, and the text area is not blank"
    })
  }
  try{
    const newSpecificNote = new SpecificNote({receiver: id, message});
    newSpecificNote.save();
    return res.status(200).json({
      success: true, 
      message: "Note Sent Successfully!"
    })
  }catch(e){
    return res.status(500).json({
      success: false, 
      message: "Internal Server Error"
    })
  }
}

const getAllReceivedNotes = async(req, res) => {
  const { id, page } = req.params; 
  try {
    if(!id || !(await mongoose.Types.ObjectId.isValid(id))){
      return res.status(404).json({
      success: false,
      message: "Ensure you're sending the correct person, and the text area is not blank"
    })
  }
  
  const totalReceivedNotes = await SpecificNote.find({receiver: id}).countDocuments().lean();
  const allReceivedNotes = await SpecificNote.find({ receiver: id}).sort({createdAt: -1}).skip((page - 1) * 10).limit(10).lean();
  return res.status(200).json({
    success: true, 
    message: "Fetched!",
    allReceivedNotes,
    totalReceivedNotes
  })
  }catch(e){
    return res.status(500).json({
    success: false, 
    message: "Internal Server Error"
  })
  }
}

const getOneSpecificNote = async(req, res) => {
  const { id } = req.params; 
try {
    if(!id || !(await mongoose.Types.ObjectId.isValid(id))){
    return res.status(500).json({
    success: false, 
    message: "Internal Server Error"
  })
  }
  
  const note = await SpecificNote.findById(id).lean();
  
  return res.status(200).json({
    success: true, 
    note
  })
}catch(e){

    return res.status(500).json({
    success: false, 
    message: "Internal Server Error"
  })
  
}
}

module.exports = { sendNote, getOneSpecificNote, getAllReceivedNotes };