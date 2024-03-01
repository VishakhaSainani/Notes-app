import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleSelectedNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDeleteNote = (id) => {
    //event.preventDefault();
    const updatedNotesList = notes.filter((note) => note.id !== id);
    setNotes(updatedNotesList);
    if (selectedNote && selectedNote.id === id) {
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }
  };
  const handleAddNote = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          content,
        }),
      });
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (event) => {
    event.preventDefault();
    if (!selectedNote) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title,
            content,
          }),
        }
      );
      const updatedNote = await response.json();
      const updatedNotesList = notes.map((note) => {
        if (note.id === selectedNote.id) return updatedNote;
        else return note;
      });
      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  return (
    <div className="App">
      <div className="app-container">
        <form
          action=""
          className="note-form"
          onSubmit={selectedNote ? handleUpdateNote : handleAddNote}
        >
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
            required
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            required
            rows={10}
          ></textarea>
          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              className="note-item"
              key={note.id}
              onClick={(event) => {
                // Check if the click event target is not the delete button
                // console.log(event.target);
                if (!event.target.closest(".notes-header button")) {
                  handleSelectedNote(note);
                }
              }}
            >
              <div className="notes-header">
                <button onClick={() => handleDeleteNote(note.id)}>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
