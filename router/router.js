
const { getAllNotes, addNote, getAllNotesByReceiver, getOneNote, findUserSubmittedNotes, getAllNoteOfUser } = require("../controller/noteController.js");
const { checkUserExist } = require('../middleware/userMiddlewares.js');
const { sendNote, getAllReceivedNotes, getOneSpecificNote } = require("../controller/SpecificNoteController.js");
const { register, login, checkSession, terminateSession, getUserInfoByName } = require("../controller/userController.js");
const router = require("express").Router();

router.get("/get-all-note/:page", getAllNotes);
router.post("/add-note", addNote);
router.get("/get-all-notesof/:receiver/:page", getAllNotesByReceiver);
router.get("/get-one-note/:id", getOneNote);
router.get("/get-submitted-notes-by-user/:sender/:page", findUserSubmittedNotes);
router.get("/get-all-notes-of-user/:id", getAllNoteOfUser);


//specifixnote 
router.post("/send-specific-note", sendNote);
router.get("/get-all-received-notes/:id/:page", getAllReceivedNotes);
router.get("/get-one-specific-note/:id", getOneSpecificNote);

//user 
router.post("/register",checkUserExist,  register);
router.post("/login",checkUserExist, login);
router.post("/session", checkSession);
router.post("/logout", terminateSession);
router.get("/get-userinfo-by-name/:name", getUserInfoByName);




module.exports = { router };