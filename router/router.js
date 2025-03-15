
const { getAllNotes, addNote, getAllNotesByReceiver, getOneNote } = require("../controller/noteController.js");
const router = require("express").Router();

router.get("/get-all-note", getAllNotes);
router.post("/add-note", addNote);
router.get("/get-all-notesof/:receiver", getAllNotesByReceiver);
router.get("/get-one-note/:id", getOneNote);


module.exports = { router };