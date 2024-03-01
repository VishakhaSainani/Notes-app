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
  const note = await prisma.note.create({
    data: { title, content },
  });
  res.json(note);
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
