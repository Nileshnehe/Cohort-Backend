import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([]);


  function fetchNotes() {
    axios("http://localhost:3000/api/notes")
      .then(res => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })

      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then(res => {
        console.log(noteId)
      })

  }


  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input type="text" name='title' placeholder='Enter Title' />
        <input type="text" name='description' placeholder='Enter Description' />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleDeleteNote(note._id)}>Delet</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App