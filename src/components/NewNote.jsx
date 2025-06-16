import { useState } from "react";
import './newNote.css'


export function NewNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const existingItems = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = {
      title: title.trim(),
      content: note.trim(),
      createdAt: new Date().toISOString()
    }
    const updatedNotes = [...existingItems, newNote]
    localStorage.setItem('notes', JSON.stringify(updatedNotes));


  }
  // console.log(title)
  return (
    <div className="container">
      <div className="main">
        <h2>New Note</h2>
        <label>
          <span>Heading</span>
          <input type="text" className="text" value={title} placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)

          }
          />
        </label>
        <label>
          <span>Note</span>
          <textarea name="" id="Note" value={note} onChange={(e) => {
            setNote(e.target.value)
          }}></textarea>
        </label>
        <a href="/" className="save-text" onClick={handleSubmit}>Save</a>
        <a href="/" className="back-text">Cancel</a>
      </div>
    </div>
  )
}