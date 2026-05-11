import React from 'react'
import './App.css'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'


const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data)
      })
      .catch(err => console.log(err))
    setUsers([]);
  }, [])

  return (
    <div>
      <h1>users</h1>
      <h1>helllllloooo</h1>
      <h3>niiiii</h3>
      <p>paragraph</p>
      <p>iam</p>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App