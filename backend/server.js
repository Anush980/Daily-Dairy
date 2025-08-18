
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors())

const FILE = "db.json";

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

app.get("/api", (req, res) => {
    const entries = loadDB();
    res.json(entries);

});
app.post("/api", (req, res) => {
    const text = (req.body && req.body.text) ? String(req.body.text).trim() : "";
    if (!text) {
        return res.status(400).json({ error: "text is required" })
    }
    const entries =loadDB();
    const entry = { "text": text};
    entries.push(entry);
    saveDB(entries);
    res.json({entries});
})
app.listen(5001, () => {
    console.log("Server is running in port number 5001");
})