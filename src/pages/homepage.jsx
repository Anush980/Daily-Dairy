import React, { useState, useEffect } from 'react';
import './homepage.css';

function DailyDiary() {
  const [diary, setDiary] = useState([]);
  const [temp, setTemp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch diary entries from API
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/notes")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch notes");
        return res.json();
      })
      .then(data => {
        const validEntries = (data || []).filter(entry => entry?.id && entry?.text);
        // Ensure consistent structure
        const normalized = validEntries.map(e => ({
          ...e,
          editing: false,
          tempText: e.text
        }));
        setDiary(normalized);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load diary entries.");
        setLoading(false);
      });
  }, []);

  // Add new entry
  async function submitHandler(e) {
    e.preventDefault();
    if (!temp.trim()) {
      setError("Please enter some text.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: temp })
      });
      if (!res.ok) throw new Error("Failed to create entry");

      const result = await res.json();
      setDiary(prev => [
        ...prev,
        { ...result, editing: false, tempText: result.text }
      ]);
      setTemp("");
      setSuccess("Entry added!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to add entry.");
      setTimeout(() => setError(""), 3000);
    }
  }

  // Delete an entry
  async function deleteHandler(id) {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setDiary(prev => prev.filter(e => e.id !== id));
      setSuccess("Entry deleted!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete entry.");
      setTimeout(() => setError(""), 3000);
    }
  }

  // Enable editing
  function enableEdit(id) {
    setDiary(prev => prev.map(e => e.id === id ? { ...e, editing: true } : e));
  }

  // Cancel editing
  function cancelEdit(id) {
    setDiary(prev => prev.map(e => e.id === id ? { ...e, editing: false, tempText: e.text } : e));
  }

  // Save edited entry
  async function saveEdit(id, newText) {
    if (!newText.trim()) {
      setError("Entry cannot be empty.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
      });
      if (!res.ok) throw new Error("Failed to save");

      const updatedNote = await res.json();
      
      setDiary(prev =>
        prev.map(e =>
          e.id === id
            ? { ...updatedNote, editing: false, tempText: updatedNote.text }
            : e
        )
      );

      setSuccess("Entry saved!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save entry.");
      setTimeout(() => setError(""), 3000);
    }
  }

  return (
    <div className="main-container">
      <header className="app-header">
        <h1>Daily Diary</h1>
        <p>Record your thoughts and track your progress</p>
      </header>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="content-container">
        <div className="left-container">
          <div className="task-container">
            <div className="left-task-container">
              <span>Total Entries</span>
              <div className="progress-container">
                <span className="entries-count">{diary.length}</span>
              </div>
            </div>
            <div className="right-task-container">
              <div className="circle-container">
                <span>{diary.length}</span>
              </div>
            </div>
          </div>

          <form onSubmit={submitHandler} className='input-form'>
            <input
              type='text'
              value={temp}
              onChange={e => setTemp(e.target.value)}
              placeholder='What are your thoughts for today...'
              className='todo-add'
            />
            <button type='submit' className='add-button'>+</button>
          </form>

          <div className="diary-entries">
            <h2>Your Entries</h2>
            {loading ? (
              <div className="loading">Loading your diary entries...</div>
            ) : diary.length === 0 ? (
              <div className="empty-state">No entries yet. Add your first entry above!</div>
            ) : (
              <ol>
                {diary.map((entry, index) => (
                  <li key={entry.id} className="list-item">
                    {entry.editing ? (
                      <div className="edit-mode">
                        <input
                          type="text"
                          value={entry.tempText || ''}
                          onChange={e => {
                            const newText = e.target.value;
                            setDiary(prev => prev.map(n =>
                              n.id === entry.id ? { ...n, tempText: newText } : n
                            ));
                          }}
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-buttons">
                          <button onClick={() => saveEdit(entry.id, entry.tempText)} className="save-btn">Save</button>
                          <button onClick={() => cancelEdit(entry.id)} className="cancel-btn">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="view-mode">
                        <div className="entry-content">
                          <span className="entry-text">{index + 1}. {entry.text}</span>
                        </div>
                        <div className="entry-actions">
                          <button onClick={() => enableEdit(entry.id)}>Edit</button>
                          <button onClick={() => deleteHandler(entry.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
        <div className="right-container">
          <Time />
        </div>
      </div>
    </div>
  );
}

function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = date => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = date => date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="time-container">
      <div className="current-time">{formatTime(time)}</div>
      <div className="current-date">{formatDate(time)}</div>
      <div className="quote-container">
        <h3>Quote of the Day</h3>
        <blockquote>"The journey of a thousand miles begins with a single step."</blockquote>
        <cite>- Lao Tzu</cite>
      </div>
    </div>
  );
}

export default DailyDiary;