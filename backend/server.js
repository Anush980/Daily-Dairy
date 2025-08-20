
const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());
 app.use("/api/notes",require("./routes/notesRouter"));


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running in port number",port);
})
//will take a look over this again
// function ensureDB() {
//     if (!fs.existsSync(FILE)) {
//         fs.writeFileSync(FILE, "[]", "utf8");
//     }
// }
// function loadDB() {
//     ensureDB();
//     try {
//         const raw = fs.readFileSync(FILE,"utf8");
//         return JSON.parse(raw);
//     }
//     catch (e) {
//         console.error(e);
//     }
// }
// function saveDB(data) {
//     try {
//         fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf8");
//     }
//     catch (e) {
//         console.error(e);
//     }
// }

// app.get("/api", (req, res) => {
//     const entries = loadDB();
//     res.json(entries);

// });
// app.post("/api", (req, res) => {
//     const text = (req.body && req.body.text) ? String(req.body.text).trim() : "";
//     if (!text) {
//         return res.status(400).json({ error: "text is required" })
//     }
//     const entries =loadDB();
//     const entry = {id:Date.now(),text};
//     entries.push(entry);
//     saveDB(entries);
//     res.json({entries});
// })
// app.delete("/api/:id",(req,res)=>{
//     const id = Number(req.params.id);
//     let entries = loadDB();
//     entries =entries.filter(e=>e.id!==id);
//     saveDB(entries);
//     res.json({entries});
// });

