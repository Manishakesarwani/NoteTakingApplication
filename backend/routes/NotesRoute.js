const express = require("express");
const { getAllNotes, createNote, updateNoteContent, updateNoteTitle, updateNoteCategory, removeNote } = require("../controllers/NotesController");

const NotesRoute = express.Router();

NotesRoute.get("/get-all-notes", getAllNotes)

NotesRoute.post("/create-note", createNote);

NotesRoute.patch("/update-note/content/:id", updateNoteContent);

NotesRoute.patch("/update-note/title/:id", updateNoteTitle);

NotesRoute.patch("/update-note/category/:id", updateNoteCategory);

NotesRoute.delete("/remove-note/:id", removeNote);

module.exports=NotesRoute