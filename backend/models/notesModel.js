//model
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../db.json');

// Helper functions
function ensureDB() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]", "utf8");
    }
}

function loadDB() {
    ensureDB();
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw);
}

function saveDB(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
}

const getAllNotes=()=>{
    return loadDB();
}

const addNote=(text)=>{
    const notes = loadDB();
    const note = {id: Date.now(),text};
    notes.push(note);
    saveDB(notes);
    return note;
}

const updateNote=(id, newText)=>{
    const notes = loadDB();
    const note = notes.find(n=>n.id===Number(id));
    if(!note) return null;
    note.text= newText;
    saveDB(notes);
    return note;
}

const deleteNote = (id)=>{
    let notes = loadDB();
    const initialLength = notes.length;
    notes = notes.filter(n => n.id !== Number(id));
    saveDB(notes);
    return notes.length < initialLength;

}

module.exports = { getAllNotes, addNote, updateNote, deleteNote };