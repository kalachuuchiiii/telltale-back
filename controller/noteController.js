
const { Note } = require("../models/noteModel.js");
const mongoose = require("mongoose");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1}).skip((req.params.page - 1) * 10).limit(10).lean();
    
    const allNotesCount = await Note.countDocuments();
    
    return res.status(200).json({
      success: true,
      notes,
      
      allNotesCount
    })
    
  } catch (e) {
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      e
    })
  }
}

const addNote = async (req, res) => {
  const receiver = req.body.receiver.trim();
  const message = req.body.message.trim();
  const sender = req?.body?.sender || "";
  if (!receiver || !message) {
    return res.status(400).json({
      success: false,
      message: "Invalid receiver or message"
    })
  }
  try {
    const newNote = new Note({ receiver, message, sender });
    await newNote.save();

    return res.status(200).json({
      success: true,
      message: `Your note was sent successfully!`
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something unexpected occured",
      e
    })
  }
}

const getAllNotesByReceiver = async (req, res) => {
  const { receiver, page } = req.params;
  if (!receiver) {
    return res.status(400).json({
      success: false,
      message: ""
    })
  }

  try {
    
    const allNotesCount = await Note.countDocuments({receiver});
   const notes = await Note.find({receiver}).sort({createdAt: - 1}).skip((page - 1) * 10).limit(10).lean();
   
   return res.status(200).json({
     success: true,
     notes,
     allNotesCount
     
   })
  } catch (e) {
    
   return res.status(500).json({
     success: false,
     e 
   })
  }
}

const getOneNote = async(req, res) => {
  const { id } = req.params; 
  
  try{
    
    const note = await Note.findById(id).lean();
    return res.status(200).json({
      success: true,
      note
    })
    
    
  }catch(e){
    return res.status(500).json({
      success: false,
      e
    })
  }
}

const findUserSubmittedNotes = async(req, res) => {
  const { sender } = req.params; 
  try {
    if(!mongoose.Types.ObjectId.isValid(sender)){
      return res.status(400).json({
        success: false,
        message: "Unexpected error has occured. Please try again"
      })
    }
    const totalNotesSubmitted = await Note.find({sender}).countDocuments();
    const notesSubmittedBySender = await Note.find({ sender }).sort({createdAt: -1});
    return res.status(200).json({
      success: true,
      totalNotesSubmitted,
      notesSubmittedBySender
    })
  
  }catch(e){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}



module.exports = { getAllNotes, addNote, getAllNotesByReceiver, getOneNote, findUserSubmittedNotes};