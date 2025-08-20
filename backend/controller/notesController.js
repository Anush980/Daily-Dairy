const fs = require('fs');
const FILE = "../db.json";

function ensureDB() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]", "utf8");
    }
}
function loadDB() {
    ensureDB();
    try {
        const raw = fs.readFileSync(FILE,"utf8");
        return JSON.parse(raw);
    }
    catch (e) {
        console.error(e);
    }
}
function saveDB(data) {
    try {
        fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
    }
    catch (e) {
        console.error(e);
    }
}



const getNotes = (req ,res)=>{
    const entries = loadDB();
    res.status(200).json({entries,
    msg:"get"
    });
}

const postNotes = (req,res)=>{
    const text = (req.body && req.body.text) ? String(req.body.text).trim() : "";
    if (!text) {
        return res.status(400).json({ error: "text is required" })
    }
    const entries =loadDB();
    const entry = {id:Date.now(),text};
    entries.push(entry);
    saveDB(entries);
    res.status(200).json({entries})
    console.log(req.body);
}

const updateNotes =(req,res)=>{
    const {id} = req.params;
     res.status(200).json({
        msg:"update",id
        });}

const deleteNotes= (req,res)=>{
    const {id} = req.params;
    let entries = loadDB();
    entries =entries.filter(e=>e.id!==Number(id));
    saveDB(entries);
    res.json({entries});
};

module.exports = {getNotes,postNotes,updateNotes,deleteNotes}