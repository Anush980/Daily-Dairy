//controller

const { getAllNotes,addNote,updateNote,deleteNote } = require('../models/notesModel');


const getNotes = (req ,res)=>{
    const entries = getAllNotes();
    res.status(200).json(entries);
};

const postNotes = (req,res)=>{
    const text = (req.body && req.body.text) ? String(req.body.text).trim() : "";
    if (!text) {
        return res.status(400).json({ error: "text is required" })
    }
    const newNote =addNote(text);
    res.status(201).json(newNote);
}


const updateNotes =(req,res)=>{
    const {id} = req.params;
    const {text} = req.body;
     if (!text) return res.status(400).json({ error: "text is required" });

    const updated = updateNote(id, text);
    if (!updated) return res.status(404).json({ error: "Note not found" });

    res.status(200).json(updated);
}

const deleteNotes= (req,res)=>{
   const { id } = req.params;
    const deleted = deleteNote(id);

    if (!deleted) return res.status(404).json({ error: "Note not found" });

    res.status(200).json({ msg: "Note deleted" });
};


module.exports = {getNotes,postNotes,updateNotes,deleteNotes}