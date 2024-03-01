import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("titel and content fileds are required");
  }
  try {
    const note = await prisma.note.create({
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    res.status(500).send("Oops something went wrong");
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.send(400).send("ID must be a valid number");
  }
  if (!title || !content) {
    return res.status(400).send("titel and content fileds are required");
  }
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.send(400).send("ID must be a valid number");
  }
  try {
    await prisma.note.delete({ where: { id } });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});