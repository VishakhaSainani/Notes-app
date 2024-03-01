import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "content 2",
    },
    {
      id: 3,
      title: "note title 3",
      content: "content 3",
    },
    {
      id: 4,
      title: "note title 4",
      content: "content 4",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState(null);

  const handleSelectedNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDeleteNote = (event, id) => {
    event.preventDefault();
    const updatedNotesList = notes.filter((note) => note.id !== id);
    setNotes(updatedNotesList);
    if (selectedNote && selectedNote.id === id) {
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }
  };
  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event) => {
    event.preventDefault();
    if (!selectedNote) return;
    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
    const updatedNotesList = notes.map((note) => {
      if (note.id === selectedNote.id) return updatedNote;
      else return note;
    });
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
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
            <div className="note-item" key={note.id}>
              <div className="notes-header">
                <button onClick={(event) => handleDeleteNote(event, note.id)}>
                  x
                </button>
              </div>
              <h2 onClick={() => handleSelectedNote(note)}>{note.title}</h2>
              <p onClick={() => handleSelectedNote(note)}>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
