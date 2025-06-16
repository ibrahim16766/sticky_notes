import { useEffect, useState } from 'react';
import './myNotes.css';
import searchImg from "../assets/searchIcon.png"
import { Navigate, useNavigate } from 'react-router-dom';

export function MyNotes() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);


  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };


  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTitle(notes[index].title);
    setEditedContent(notes[index].content);
  };


  const handleSaveEdit = () => {
    const updatedNotes = [...notes];
    updatedNotes[editingIndex] = {
      ...updatedNotes[editingIndex],
      title: editedTitle,
      content: editedContent,
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditingIndex(null);
    setEditedTitle("");
    setEditedContent("");
  };


  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTitle("");
    setEditedContent("");
  };


  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="header">
        <a href="/" className='notes'>
          Sticky Note
        </a>
        <div>
          <div className='search-container'>
            <input
              type="text"
              className="search"
              placeholder="Search Notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={searchImg} alt="" className='icon' />
          </div>
        </div>
        <div>
          <button onClick={() => navigate('newNote')} className='create-button'>Create Note</button>
        </div>
      </div>
      <hr />

      <div className="content">
        {filteredNotes.length === 0 ? (
          <p><b>

            Nothing here yet. Add one to get started!
          </b>
          </p>
        ) : (
          filteredNotes.map((note, index) => (
            <div key={index} className="note-card">
              {editingIndex === index ? (
                <>
                  <div className='edit-title'>
                    <span>Heading</span>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </div>
                  <div className='edit-title'>
                    <span>Note</span>
                    <textarea
                      className='edit-Note'
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="buttons">
                    <button className="save" onClick={handleSaveEdit}>Save</button>
                    <button className="cancel" onClick={handleCancelEdit}>Delete</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="title">{note.title}</p>
                  <p className="note">{note.content}</p>
                  <div className="buttons">
                    <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(index)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}