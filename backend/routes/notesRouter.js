//routes

const express = require('express');
const { getNotes, postNotes, updateNotes, deleteNotes } = require('../controller/notesController');
const router = express.Router();


router.get("/",getNotes);
router.post("/",postNotes);
router.put("/:id",updateNotes);
router.delete("/:id",deleteNotes);

module.exports= router;