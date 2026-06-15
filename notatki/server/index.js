import express, { json } from "express";
import { getTasks, saveBackup } from "./app/dbcontroller.js"

const app = express()
const PORT = 3000;
app.use(json())

app.get("/api/task", async (req, res) => {
    try {
        console.log("get");
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message || "Wystąpił błąd serwera" });
    }
})

app.post("/api/task", async (req, res) => {
    try {
        console.log("post");
        const notes = req.body;
        const result = await saveBackup(notes);
        res.status(201).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ error: error.message || "Wystąpił błąd serwera" });
    }
});

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));