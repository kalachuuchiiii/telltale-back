
const { getAllNotes, addNote, getAllNotesByReceiver, getOneNote } = require("../controller/noteController.js");
const { checkUserExist } = require('../middleware/userMiddlewares.js');
const { register, login, checkSession, terminateSession } = require("../controller/userController.js");
const router = require("express").Router();

router.get("/get-all-note/:page", getAllNotes);
router.post("/add-note", addNote);
router.get("/get-all-notesof/:receiver/:page", getAllNotesByReceiver);
router.get("/get-one-note/:id", getOneNote);

//user 
router.post("/register",checkUserExist,  register);
router.post("/login",checkUserExist, login);
router.post("/session", checkSession);
router.post("/logout", terminateSession);


module.exports = { router };